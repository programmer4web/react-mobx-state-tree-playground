import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot, getSnapshot } from 'mobx-state-tree';

import App from './components/App';
import {WishList} from './models/WishList';
import stateData from './assets/data.json';
import {Provider} from 'mobx-react';

let initialState = stateData;
// const data = localStorage.getItem("wishlistapp");
// if(data){
//   initialState = JSON.parse(data);
// }
let wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot));
})

function renderApp(){
  ReactDOM.render(
    <Provider wishList={wishList}><App /></Provider>
    , document.getElementById('root'));
}

renderApp();

if(module.hot) {
  module.hot.accept(['./components/App'], () => {
    renderApp()
  });
  module.hot.accept(["./models/WishList"], () => {
    const snapshot = getSnapshot(wishList);
    wishList = WishList.create(snapshot);
    renderApp();
  });
}