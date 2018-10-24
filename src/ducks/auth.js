import { appName } from "../confige";
import firebase from "firebase";
import { Record } from "immutable";
import { all, call, put, take, cps } from "redux-saga/effects";

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
});

// const
export const moduleName = "auth";
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;
// reducer
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
      return state.set("loading", true);

    case SIGN_IN_SUCCESS:
      return state
        .set("loading", false)
        .set("user", payload.user)
        .set("error", null);

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return state.set("loading", false).set("error", error);

    default:
      return state;
  }
}

// AC

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  };
}

// SAGA

export const signUpSaga = function*() {
  const auth = firebase.auth();

  const action = yield take(SIGN_UP_REQUEST);
  while (true) {
    try {
      const user = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      );

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      });
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      });
    }
  }
};

// AC
// export function signUp(email, password) {
//   return dispatch => {
//     dispatch({
//       type: SIGN_UP_REQUEST
//     });

//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(user =>
//         dispatch({
//           type: SIGN_UP_SUCCESS,
//           payload: { user }
//         })
//       )
//       .catch(error =>
//         dispatch({
//           type: SIGN_UP_ERROR,
//           error
//         })
//       );
//   };
// }

export const watchStatusChange = function*() {
  const auth = firebase.auth();
  try {
    yield cps([auth, auth.onAuthStateChanged]);
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    });
  }
};

firebase.auth().onAuthStateChanged(user => {
  const store = require("../redux").default;
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  });
});

export const saga = function*() {
  yield all([signUpSaga(), watchStatusChange()]);
};
