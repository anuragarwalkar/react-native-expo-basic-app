export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

export default (state = initialState, action: { type: string; payload: { token: string } }) => {
  return state;
};
