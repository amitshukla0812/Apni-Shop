import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./index"
import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../../Constant"


function* createSaga(action) {               //worker saga
    let response = yield createRecord("contactus", action.payload)         // if data has no file field
    //   let response = yield createMultipartRecord("contactus", action.payload)         // if data has at least 1 file field
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}

function* getSaga(action) {               //worker saga
    let response = yield getRecord("contactus", action.payload)         // if data has no file field

    yield put({ type: GET_CONTACTUS_RED, payload: response })
}


function* updateSaga(action) {               //worker saga
    yield updateRecord("contactus", action.payload)         // if data has no file field
    // yield updateMultipartRecord("contactus", action.payload)         // if data has at least 1 file field
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload })


    // // in case of real backend
    //    let response =  yield updateRecord("contactus", action.payload)         // if data has no file field
    //    //let response = yield updateMultipartRecord("contactus", action.payload)         // if data has at least 1 file field
    //     yield put({type: UPDATE_CONTACTUS_RED, payload: response })
}



function* deleteSaga(action) {               //worker saga
    yield deleteRecord("contactus", action.payload)         // if data has no file field

    yield put({ type: DELETE_CONTACTUS_RED, payload: action.payload })
}


export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)     //watcher saga
    yield takeEvery(GET_CONTACTUS, getSaga)                             //watcher saga
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)                             //watcher saga
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)                             //watcher saga
}
