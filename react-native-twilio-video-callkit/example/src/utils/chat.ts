import { Client as TwillioClient } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { logger } from './logger';
import { ChatChannelType } from '../redux/chat/reducers';
import { store } from '../App';
import { getTwillioChatToken } from '../redux/app/actions';
import {
  CHAT_LOADING,
  setChatChannels,
  setLastMessages,
  SetLastMessageType,
  setTypingByChannelUniqueName,
  SET_CHANNELS_FAILED,
  SET_CHAT_INIT,
} from '../redux/rootActions';
import { isAuthenticated } from './auth';
let chatClient: null | TwillioClient = null;

async function getNewTwillioToken() {
  const newToken: any = await store.dispatch(getTwillioChatToken());
  return newToken;
}

async function updateChatClientToken() {
  const newToken: string = await getNewTwillioToken();
  if (chatClient && newToken) {
    await chatClient.updateToken(newToken);
    await fetchChatChannels();
  }
}

/**
 * Shutdown on update
 */
export async function shutdownChatClient(): Promise<void> {
  try {
    if (chatClient) {
      chatClient.off('typingStarted', () => {});
      chatClient.off('typingEnded', () => {});
      chatClient.off('messageAdded', () => {});
      chatClient.off('channelAdded', () => {});
      chatClient.off('connectionError', () => {});
      chatClient.off('messageRemoved', () => {});
      await chatClient.shutdown();
      chatClient = null;
    }
  } catch (error) {
    logger.error('shutdownChatClient error', error);
  }
}

export function isConnected() {
  return chatClient && (chatClient.connectionState === 'connected' || chatClient.connectionState === 'connecting');
}

export async function fetchChatChannels() {
  try {
    const chatInit = store.getState().chat.chatInit;
    const chatChannelsLoading = store.getState().chat.chatChannelsLoading;
    if (chatInit && chatChannelsLoading) {
      return null;
    }
    if (!chatInit) {
      store.dispatch({ type: SET_CHAT_INIT, payload: true });
    }
    logger.debug('called fetchChatChannels ');

    if (chatClient && isConnected()) {
      let activeChannels: Channel[] = [];
      store.dispatch({ type: CHAT_LOADING, payload: true });
      let channelPaginator = await chatClient.getSubscribedChannels();
      activeChannels = channelPaginator.items;

      while (channelPaginator.hasNextPage) {
        channelPaginator = await channelPaginator.nextPage();
        activeChannels = activeChannels.concat(channelPaginator.items);
        logger.debug('activeChannels length ', activeChannels.length);
      }
      const chatChannels = getChatChannels(activeChannels);
      await store.dispatch(setChatChannels(chatChannels));
      const lastMessages = await Promise.all(activeChannels.map(ch => getLastMessageByChannel(ch)));
      await store.dispatch(setLastMessages(lastMessages));
    } else {
      await updateChatClientToken();
    }
  } catch (error) {
    store.dispatch({ type: SET_CHANNELS_FAILED, payload: 'connection issue.' });
    logger.error('caught fetchChatChannels', error);
  }
}

export async function updateLastMessageByChannel(channel: Channel) {
  const lastMessage = await getLastMessageByChannel(channel);
  store.dispatch(setLastMessages([lastMessage]));
}

export async function initChatConnectivity() {
  if (!isAuthenticated()) {
    return null;
  }
  store.dispatch({ type: CHAT_LOADING, payload: true });
  await getChatClient();
}

async function onTyping(uniqueName: string, isTyping: boolean) {
  store.dispatch(setTypingByChannelUniqueName(uniqueName, isTyping));
}

async function getLastMessageByChannel(channel: Channel): Promise<SetLastMessageType> {
  let count = await channel.getUnconsumedMessagesCount();
  const lastMessages = await channel.getMessages(1);
  const lastMessage = lastMessages.items.length ? lastMessages.items[0] : null;
  const profile = store.getState().profile.profile;
  if (lastMessage && lastMessage.author && profile) {
    if (lastMessage.author === profile.userId) {
      count = 0;
    }
  }

  return {
    uniqueName: channel.uniqueName,
    lastMessageText: lastMessage ? lastMessage.body : '',
    lastMessageType: lastMessage && lastMessage.type,
    unreadCount: count || 0,
    lastMessageTimeStamp: lastMessage && lastMessage.timestamp ? lastMessage.timestamp.toISOString() : null,
  };
}

export async function getChatClient(): Promise<null | TwillioClient> {
  if (!isAuthenticated()) {
    return null;
  }
  try {
    if (chatClient && (chatClient.connectionState === 'connected' || chatClient.connectionState === 'connecting')) {
      return chatClient;
    }
    if (chatClient) {
      updateChatClientToken();
    } else {
      const token = await getNewTwillioToken();
      chatClient = await TwillioClient.create(token);
      chatClient.on('connectionStateChanged', function(state) {
        logger.info('connectionStateChanged state', state);
      });
      chatClient.on('tokenExpired', async (ch: any) => {
        logger.debug('event tokenExpired', ch);
        updateChatClientToken();
      });
      chatClient.on('tokenAboutToExpire', (ch: any) => {
        logger.debug('event tokenAboutToExpire', ch);
        updateChatClientToken();
      });
      chatClient.on('connectionStateChanged', function(state) {
        logger.debug('state', state);
      });
      chatClient.on('channelJoined', (ch: any) => {
        logger.debug('on channelJoined', ch);
        fetchChatChannels();
      });
      chatClient.on('channelRemoved', (ch: any) => {
        logger.debug('on channelRemoved', ch);
        fetchChatChannels();
      });
      chatClient.on('messageAdded', (ch: any) => {
        logger.debug('on messageAdded', ch.channel);
        updateLastMessageByChannel(ch.channel);
      });
      chatClient.on('messageRemoved', (ch: any) => {
        logger.debug('on messageRemoved', ch);
        updateLastMessageByChannel(ch.channel);
      });

      chatClient.on('typingStarted', ch => {
        if (ch && ch.channel && ch.channel.state) {
          onTyping(ch.channel.state.uniqueName, true);
          logger.debug(ch.channel.state.uniqueName, 'isTyping', true);
        }
      });
      chatClient.on('typingEnded', ch => {
        if (ch && ch.channel && ch.channel.state) {
          onTyping(ch.channel.state.uniqueName, false);

          logger.debug(ch.channel.state.uniqueName, 'isTyping', false);
        }
      });
      await fetchChatChannels();
    }
  } catch (error) {
    logger.error('getChatClient caught error', error);
    store.dispatch({ type: SET_CHANNELS_FAILED, payload: 'connection issue' });
    chatClient = null;
  }

  return chatClient;
}

function getChatWithUserIdByChannelName(uniqueName: string, currenUserId: string): string {
  const users = uniqueName.replace('ch_', '').split('_');
  let chatWithUserId: string = '';
  users.map(user => {
    if (user !== currenUserId) {
      chatWithUserId = user;
    }
  });
  return chatWithUserId;
}

export function getChatChannels(channels: Channel[]): ChatChannelType[] {
  const profile = store.getState().profile.profile;
  if (!profile) {
    return [];
  }
  const chatChannels: ChatChannelType[] = channels.map(ch => {
    const chatWithUserId = getChatWithUserIdByChannelName(ch.uniqueName, profile.userId);
    return {
      sid: ch.sid,
      uniqueName: ch.uniqueName,
      friendlyName: ch.friendlyName,
      lastConsumedMessageIndex: ch.lastConsumedMessageIndex,
      chatWithUserId,
      isTyping: false,
      lastMessageText: '',
      lastMessageTimeStamp: undefined,
      unreadCount: 0,
    };
  });
  return chatChannels;
}
