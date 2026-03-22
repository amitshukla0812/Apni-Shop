import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./index"
import { CREATE_NEWSLATER, CREATE_NEWSLATER_RED, DELETE_NEWSLATER, DELETE_NEWSLATER_RED, GET_NEWSLATER, GET_NEWSLATER_RED, UPDATE_NEWSLATER, UPDATE_NEWSLATER_RED } from "../../Constant"


function* createSaga(action) {               //worker saga
    let response = yield createRecord("newsletter", action.payload)         // if data has no file field
    //   let response = yield createMultipartRecord("newsletter", action.payload)         // if data has at least 1 file field
    yield put({ type: CREATE_NEWSLATER_RED, payload: response })
}

function* getSaga(action) {               //worker saga
    let response = yield getRecord("newsletter", action.payload)         // if data has no file field

    yield put({ type: GET_NEWSLATER_RED, payload: response })
}


function* updateSaga(action) {               //worker saga
    yield updateRecord("newsletter", action.payload)         // if data has no file field
    // yield updateMultipartRecord("newsletter", action.payload)         // if data has at least 1 file field
    yield put({ type: UPDATE_NEWSLATER_RED, payload: action.payload })


    // // in case of real backend
    //    let response =  yield updateRecord("newsletter", action.payload)         // if data has no file field
    //    //let response = yield updateMultipartRecord("newsletter", action.payload)         // if data has at least 1 file field
    //     yield put({type: UPDATE_NEWSLATER_RED, payload: response })
}



function* deleteSaga(action) {               //worker saga
    yield deleteRecord("newsletter", action.payload)         // if data has no file field

    yield put({ type: DELETE_NEWSLATER_RED, payload: action.payload })
}

export default function* NewslaterSagas() {
    yield takeEvery(CREATE_NEWSLATER, createSaga)     //watcher saga
    yield takeEvery(GET_NEWSLATER, getSaga)                             //watcher saga
    yield takeEvery(UPDATE_NEWSLATER, updateSaga)                             //watcher saga
    yield takeEvery(DELETE_NEWSLATER, deleteSaga)                             //watcher saga
}
