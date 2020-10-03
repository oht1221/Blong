import React from 'react';
import store, { history } from './store';
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux'
import { ConnectedRouter }  from 'connected-react-router'
import MyRouter from './routes/Router'
import './assets/custom.scss'


const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
