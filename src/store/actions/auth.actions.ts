import { Dispatch } from 'react';

export const SIGNUP_INIT = 'SIGNUP_INIT';
const token = '';

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch<{}>) => {
    try {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}`, {
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
      const resData = await res.json();
      console.log('resData:', resData);
    } catch (error) {
      console.log('error:', error);
      throw new Error('something went wrong');
    }

    dispatch({
      type: SIGNUP_INIT,
      payload: {
        email,
        password,
      },
    });
  };
};
