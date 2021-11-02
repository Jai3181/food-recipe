import { authConstants } from "../actions/constants"

const initState = {
  token: null,
  user: {
    userName: "",
    email: "",
    id: ""
  },
  authenticate: false,
  authenticating: false
}

export default (state = initState, action) => {
  console.log(action)
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      }
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false
      }
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        error: action.payload.error
      }
      break
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        authenticating: true,
      }
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...state,
        authenticate: false,
        authenticating: false
      }
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        authenticating: false,
      }
      break
    // case authConstants.SIGNUP_REQUEST:
    //   state = {
    //     ...state,
    //     authenticating: true,
    //   }
    //   break;
    // case authConstants.SIGNUP_SUCCESS:
    //   state = {
    //     ...state,
    //     authenticating: false
    //   }
    //   break;
    // case authConstants.SIGNUP_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error
    //   }
    //   break
  }
  return state
}