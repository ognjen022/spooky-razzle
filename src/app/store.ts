import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory, createMemoryHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { RootEventTypes } from "../services/RootEventTypes";
import epics from "../services/rootEpic";

import rootReducer from "../services/rootReducer";
import { RootState } from "../services/RootState";
import { hash } from "../services/shared/hash";
import { cleanoutOldVersions } from "../services/shared/tokenLocalStorage";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

cleanoutOldVersions();

const persistConfig = {
  key: `root:${hash()}`,
  storage,
  blacklist: ["router", "notifications"],
};

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const history = isServer
  ? createMemoryHistory({
      initialEntries: ["/"],
    })
  : createBrowserHistory({ basename: "" });

const epicMiddleware = createEpicMiddleware<
  RootEventTypes,
  RootEventTypes,
  RootState
>();

let composeEnhancers;

if (!isServer) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

// Create store
function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [routerMiddleware(history), epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

  return createStore(persistedReducer, initialState, enhancer);
}

const store = configureStore();
const persistor = persistStore(store);

epicMiddleware.run(epics);

export { store, persistor };
