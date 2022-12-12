import {combineReducers} from 'redux';
import auth from "./slices/auth";
import noticedPartnerProgramsReducer from "./slices/noticedPartnerPrograms";
import payment from "./slices/payment";
import {persistReducer} from "redux-persist";
import profileSetup from "@slices/profileSetup";
import storage from "redux-persist/lib/storage";

const noticedPartnerProgramsPersistConfig = {
    key: 'noticedPartnerPrograms',
    storage,
    keyPrefix: 'redux-'
};

export const rootReducer = combineReducers({
    noticedPartnerPrograms: persistReducer(noticedPartnerProgramsPersistConfig, noticedPartnerProgramsReducer),
    auth,
    profileSetup,
    payment
});
