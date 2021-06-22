import { useDispatch, useSelector } from 'react-redux';

import InitialAnsweringView from './InitialAnsweringView';
import InitialCallingView from './InitialRingingView';
import React from 'react';
import { RootState } from '../../redux/rootReducer';
// import Timer from '../../components/videoCall/Timer';
import { updateCallStatus } from '../../redux/rootActions';

interface Props {
  onCallAnswer: () => void;
  onTimeExceeded: () => void;
}

const InitialCallView: React.FC<Props> = ({ onCallAnswer, onTimeExceeded }) => {
  const currentCall = useSelector((state: RootState) => state.app.currentCall);
  const currentCallType = useSelector((state: RootState) => state.app.currentCallType);
  const dispatch = useDispatch();

  if (currentCall && currentCallType) {
    return (
      <>
       
        {currentCallType === 'incomming' ? (
          <InitialAnsweringView
            name={currentCall.booking.expert.name}
            image={currentCall.booking.expert.profilePic}
            onCallIgnore={() => dispatch(updateCallStatus('CALL_REJECTED'))}
            onCallAnswer={() => {
              dispatch(updateCallStatus('CALL_ANSWERED'));
              onCallAnswer();
            }}
          />
        ) : (
          <InitialCallingView
            name={currentCall.booking.customer.name}
            image={currentCall.booking.customer.profilePic}
            onCutCall={() => dispatch(updateCallStatus('CALL_CUT_BEFORE_ANSWER'))}
          />
        )}
      </>
    );
  }
  return null;
};

export default InitialCallView;
