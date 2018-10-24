import { appName } from "../confige";
import firebase from "firebase";
import { Record, List } from "immutable";
import { put, takeEvery } from "redux-saga/effects";
import { generateId } from "./utils";

const ReducerState = Record({
  entities: new List([])
});

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
});

export const moduleName = "people";
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update("entities", entities =>
        entities.push(new PersonRecord(payload))
      );

    default:
      return state;
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  };
}

const addPeasonSaga = function*(action) {
  const id = generateId();

  yield put({
    type: ADD_PERSON,
    payload: { ...action.payload, id }
  });
};

// export function addPerson(person) {
//   return dispatch => {
//     dispatch({
//       type: ADD_PERSON,
//       payload: {
//         person: { id: Date.now(), ...person }
//       }
//     });
//   };
// }

export const saga = function*() {
  yield takeEvery(ADD_PERSON_REQUEST, addPeasonSaga);
};
