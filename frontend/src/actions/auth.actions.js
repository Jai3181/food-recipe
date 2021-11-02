import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
  console.log(user)
  return async (dispatch) => {

    dispatch({ type: authConstants.LOGIN_REQUEST })

    const res = await axiosInstance.post('/signin', {
      ...user
    })
    console.log("res of axiosIntance post call", res)

    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
      })
    }
    else if (res.status === 400) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    if (localStorage.getItem("token") === null && localStorage.getItem("user") === null) {
      dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
    else {
      dispatch({ type: authConstants.LOGOUT_FAITLURE })
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token")
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
      })
    }
    else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "failed to login"
        }
      })
    }
  }
}