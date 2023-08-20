import { useReducer, useCallback } from 'react';

function httpReducer(httpState, action) {
  switch (action.type) {
    case 'send_request': {
      return {
        data: null,
        error: null,
        status: 'pending',
      };
    }
    case 'success': {
      return {
        data: action.data,
        error: null,
        status: 'completed',
      };
    }
    case 'error': {
      return {
        data: null,
        error: action.errorMessage,
        status: 'completed',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function useHttp(sendRequest, isRequestSending = false) {
  const initialHttpState = {
    data: null,
    error: null,
    status: isRequestSending ? 'pending' : null,
  };
  const [httpState, dispatch] = useReducer(httpReducer, initialHttpState);

  const sendHttpRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'send_request' });
      try {
        const responseData = await sendRequest(requestData);
        dispatch({ type: 'success', data: responseData });
      } catch (error) {
        dispatch({
          type: 'error',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [sendRequest]
  );

  return {
    sendHttpRequest,
    ...httpState,
  };
}

export default useHttp;
