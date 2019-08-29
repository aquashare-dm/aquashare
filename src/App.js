import React from 'react';
import "./reset.css";
import './App.css';
import { HashRouter as Router } from 'react-router-dom'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import routes from "./routes.js";

function App() {

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App" >
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
            {routes}
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

// Call it once in your app. At the root of your app is the best place
