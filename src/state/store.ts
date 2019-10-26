import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { editors, repositories, timetables, viewstyles } from "./ducks";

const rootPersistConfig = {
  key: "root",
  version: 0,
  storage,
  blacklist: ["editors", "repositories", "timetables", "viewstyles"]
};

const editorsPersistConfig = {
  key: "editors",
  version: 0,
  storage,
  whitelist: ["selectedTBL", "editData"]
};

const repositoriesPersistConfig = {
  key: "repositories",
  version: 0,
  storage,
  whitelist: ["tbls", "historySize"]
};

const viewStylesPersistConfig = {
  key: "viewstyles",
  version: 0,
  storage,
  whitelist: ["viewerHeight", "textEditorRow", "appGridRow"]
};

const rootReducer = combineReducers({
  editors: persistReducer(editorsPersistConfig, editors),
  repositories: persistReducer(repositoriesPersistConfig, repositories),
  timetables,
  viewstyles: persistReducer(viewStylesPersistConfig, viewstyles)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const reduxStore = createStore(persistedReducer);
export const persistor = persistStore(reduxStore);
export type State = ReturnType<typeof rootReducer>;
