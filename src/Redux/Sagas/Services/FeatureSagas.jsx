import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./index"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../../Constant"


function* createSaga(action) {               //worker saga
    let response = yield createRecord("feature", action.payload)         // if data has no file field
    //   let response = yield createMultipartRecord("feature", action.payload)         // if data has at least 1 file field
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga(action) {               //worker saga
    let response = yield getRecord("feature", action.payload)         // if data has no file field

    yield put({ type: GET_FEATURE_RED, payload: response })
}


function* updateSaga(action) {               //worker saga
    yield updateRecord("feature", action.payload)         // if data has no file field
    // yield updateMultipartRecord("feature", action.payload)         // if data has at least 1 file field
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })


    // // in case of real backend
    //    let response =  yield updateRecord("feature", action.payload)         // if data has no file field
    //    //let response = yield updateMultipartRecord("feature", action.payload)         // if data has at least 1 file field
    //     yield put({type: UPDATE_FEATURE_RED, payload: response })
}



function* deleteSaga(action) {               //worker saga
    yield deleteRecord("feature", action.payload)         // if data has no file field

    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)     //watcher saga
    yield takeEvery(GET_FEATURE, getSaga)                             //watcher saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)                             //watcher saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)                             //watcher saga
}
