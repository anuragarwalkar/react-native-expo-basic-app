import { SIGNIN_INIT, SIGNUP_INIT } from '../actions/auth.actions';

export interface AuthState {
  token: string;
  userId: string;
  expiresIn: Date;
}

const initialState: AuthState = {
  token: '',
  userId: '',
  expiresIn: new Date(),
};

export default (state = initialState, action: { type: string; payload: AuthState }) => {
  switch (action.type) {
    case SIGNIN_INIT:
    case SIGNUP_INIT: {
      const { userId, token, expiresIn } = action.payload;
      return {
        ...state,
        userId,
        token,
        expiresIn,
      };
    }
  }
  return state;
};
