import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/auth.reducer';
import alertReducer from './alert/alert.reducer';
import profileReducer from './profile/profile.reducer';
import postsReducer from './post/post.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    post: postsReducer
});


export default persistReducer(persistConfig, rootReducer);