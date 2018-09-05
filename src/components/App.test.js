import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'mobx-react';

import stateData from '../assets/data.json';
import AppSettings from '../models/AppSettings';
import {User} from '../models/Group';
import {WishList} from '../models/WishList';

it('renders without crashing', () => {
  const user = {
    id: "0",
    name: "Jon Doe",
    gender: "m"
  },
  userStore = User.create(user),
  appSettings = {
    showUserAttributes: false
  },
    AppSettingsStore = AppSettings.create(appSettings),
    wishList = WishList.create(stateData, {
    alert: m => console.log(m)
  });
  const div = document.createElement('div');
  ReactDOM.render(<Provider wishList={wishList} user={userStore} appSettings={AppSettingsStore}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
