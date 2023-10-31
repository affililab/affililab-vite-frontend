import {combineReducers} from 'redux';
import auth from "./slices/auth";
import noticedPartnerProgramsReducer from "./slices/noticedPartnerPrograms";
import welcomeModal from "./slices/welcomeModal";
import payment from "./slices/payment";
import {persistReducer} from "redux-persist";
import profileSetup from "@slices/profileSetup";
import storage from "redux-persist/lib/storage";
import firstWizardModal from "@slices/firstWizardModal";

const noticedPartnerProgramsPersistConfig = {
    key: 'noticedPartnerPrograms',
    storage,
    keyPrefix: 'redux-'
};

const welcomeModalPersistConfig = {
    key: 'welcomeModal',
    storage,
    keyPrefix: 'redux-'
};

const firstWizardModalPersistConfig = {
    key: 'firstWizardModal',
    storage,
    keyPrefix: 'redux-'
};

export const rootReducer = combineReducers({
    noticedPartnerPrograms: persistReducer(noticedPartnerProgramsPersistConfig, noticedPartnerProgramsReducer),
    welcomeModal: persistReducer(welcomeModalPersistConfig, welcomeModal),
    firstWizardModal: persistReducer(firstWizardModalPersistConfig, firstWizardModal),
    auth,
    profileSetup,
    payment
});
