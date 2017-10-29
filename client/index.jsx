import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'jquery/dist/jquery';
import './public/js/index';
import configureStore from './store/configureStore';

import Routes from './components/Routes';

const store = configureStore();

render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('app')
  );
