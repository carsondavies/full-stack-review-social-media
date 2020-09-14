import axios from 'axios'

// inintial state, what our redux store will hold
const initialState = {
  user: {},
  isLoggedIn: false
}

//Action constants, the names of the actions we can take
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'

//action creators - functions that will perform the actions
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function getUser() {
  const payload = axios.get('/auth/user')

  return {
    type: GET_USER,
    payload: payload
  }
}

//Reducer function - responsible for actually changing state
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload, isLoggedIn: true }
    case LOGOUT_USER:
      return initialState
    case GET_USER + '_PENDING':
      return { ...state }
    case GET_USER + '_FULFILLED':
      return { ...state, user: action.payload.data, isLoggedIn: true }
    case GET_USER + '_REJECTED':
      return initialState
    default:
      return initialState
  }
}