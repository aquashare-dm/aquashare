import React from 'react';
import "./reset.css";
import './App.css';
import { HashRouter as Router } from 'react-router-dom'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import routes from "./routes.js";

function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App" >
            {routes}
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
