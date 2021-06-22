import React from 'react';
import InitialAnsweringView from './InitialAnsweringView';
import InitialCallingView from './InitialRingingView';


interface Props {
  dispatchOnCutCall: () => void;
  dispatchOnCallIgnore: () => void;
  dispatchOnCallAnswer: () => void;
  currentCall: any;
  currentCallType: any;
  callCutIcon: any;
  callAnswerIcon: any;
  soundPlayer: any;
  appState: any;
}

const InitialCallView: React.FC<Props> = ({currentCall, currentCallType, dispatchOnCutCall, 
  dispatchOnCallIgnore, dispatchOnCallAnswer,
  callAnswerIcon, callCutIcon,
  soundPlayer,
  appState

}) => {
  
  // const dispatch = useDispatch();

  if (currentCall && currentCallType) {
    return (
      <>
       
        {currentCallType === 'incomming' ? (
          <InitialAnsweringView
            name={currentCall.booking.expert.name}
            image={currentCall.booking.expert.profilePic}
            onCallIgnore={() => {
              console.log('call ignore library ?')
              dispatchOnCallIgnore()
            }}
            onCallAnswer={() => {
            //  console.log('')
             dispatchOnCallAnswer()
            }}
            callAnswerIcon={callAnswerIcon}
            callCutIcon={callCutIcon}
            soundPlayer={soundPlayer}
            appState={appState}
          />
        ) : (
          <InitialCallingView
            name={currentCall.booking.customer.name}
            image={currentCall.booking.customer.profilePic}
            onCutCall={() => {
              console.log('cut call before answering ? library ')
              dispatchOnCutCall()
            }}
            callCutIcon={callCutIcon}
            // onCutCall={() => dispatch(updateCallStatus('CALL_CUT_BEFORE_ANSWER'))}
          />
        )}
      </>
    );
  }
  return null;
};

export default InitialCallView;
