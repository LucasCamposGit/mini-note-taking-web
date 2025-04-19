import { AuthState, initialAuthState } from "@/types/state";
import { AUTH_ACTION, AuthAction } from "@/types/action";

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    // Login actions
    case AUTH_ACTION.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false
      };
      
    case AUTH_ACTION.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        tokens: {
          accessToken: action.payload.token,
          refreshToken: action.payload.refreshToken
        },
        user: {
          ...state.user,
          ...action.payload.user
        }
      };
      
    case AUTH_ACTION.LOGIN_FAILURE:
      return {
        ...initialAuthState
      };
      
    // Logout action
    case AUTH_ACTION.LOGOUT:
      return {
        ...initialAuthState
      };
      
    // Token refresh
    case AUTH_ACTION.REFRESH_TOKEN_REQUEST:
      return state;
      
    case AUTH_ACTION.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        tokens: {
          accessToken: action.payload.token,
          refreshToken: action.payload.refreshToken
        }
      };
      
    case AUTH_ACTION.REFRESH_TOKEN_FAILURE:
      // On refresh failure, we should log the user out
      return {
        ...initialAuthState
      };
      
    // User profile
    case AUTH_ACTION.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      
    case AUTH_ACTION.SET_PREMIUM_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          isPremium: action.payload
        }
      };
      
    default:
      return state;
  }
};