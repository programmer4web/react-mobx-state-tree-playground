import React from 'react';
import Enzime, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stateData from '../assets/data.json';
import { WishList } from '../models/WishList';
import WishListItemEntry from './WishListItemEntry';

Enzime.configure({ adapter: new Adapter() });

const wishList = WishList.create(stateData, {
  alert: m => console.log(m)
}),
  div = document.createElement('div');

it('instantiates an WishListItemEdit without error', () => {
  ReactDOM.render(<Provider wishList={wishList} >
    <WishListItemEntry wishList={wishList} />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('onAdd method ads new entry in wishlist', () => {
  const length = wishList.items.length, 
    wrapper = mount(
      <Provider wishList={wishList} >
        <WishListItemEntry wishList={wishList} />
      </Provider>
    ),
    buttton = wrapper.find('button');
  
    buttton.simulate('click');
    expect(wishList.items.length).toBe(length + 1);
    expect(wishList.items[length].name).toBe('');
    expect(wishList.items[length].price).toBe(0);
});