import { Dispatch } from 'react';
import { deviceStorage, getExpiresIn, getExpiresInDate } from '../../utils/utilityFunctions';
import { AuthState } from '../reducers/auth.reducer';

export const SIGNUP_INIT = 'SIGNUP_INIT';
export const SIGNIN_INIT = 'SIGNIN_INIT';
export const LOGOUT_INIT = 'LOGOUT_INIT';

const apiKey = '';
const baseUrl = (path: string) => `https://identitytoolkit.googleapis.com/v1/accounts${path}${apiKey}`;

export const signup = (email: string, password: string) => {
  let resData: any = null;

  return async (dispatch: Dispatch<{}>) => {
    try {
      const res = await fetch(baseUrl(`:signUp?key=`), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      if (!res.ok) {
        throw new Error('something went wrong');
      }
      resData = await res.json();
    } catch (error) {
      throw new Error('something went wrong');
    }
    const expiresIn = getExpiresIn(resData.expiresIn);
    const dispatchItem = {
      type: SIGNUP_INIT,
      payload: {
        token: resData.idToken,
        userId: resData.localId,
        expiresIn,
      },
    };

    dispatch(dispatchItem);
    deviceStorage().setUser(dispatchItem.payload);
  };
};

export const signin = (email: string, password: string) => {
  let resData: any = null;
  return async (dispatch: Dispatch<{}>) => {
    try {
      const res = await fetch(baseUrl(`:signInWithPassword?key=`), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
    const expiresIn = getExpiresInDate(resData.expiresIn);
    console.log('expiresIn:', expiresIn);
    const dispatchItem = {
      type: SIGNIN_INIT,
      payload: {
        token: resData.idToken,
        userId: resData.localId,
        expiresIn,
      },
    };

    dispatch(dispatchItem);
    deviceStorage().setUser(dispatchItem.payload);
  };
};

export const authenticate = (payload: AuthState) => {
  return {
    type: SIGNIN_INIT,
    payload,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_INIT,
  };
};
