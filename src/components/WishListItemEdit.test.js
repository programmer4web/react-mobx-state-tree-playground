import React from 'react';
import Enzime, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stateData from '../assets/data.json';
import { WishList } from '../models/WishList';
import WishListItemEdit from './WishListItemEdit';

Enzime.configure({ adapter: new Adapter() });

const wishList = WishList.create(stateData, {
  alert: m => console.log(m)
}),
  div = document.createElement('div');

it('instantiates an WishListItemEdit without error', () => {
  ReactDOM.render(<Provider wishList={wishList} >
    <WishListItemEdit item={wishList.items[0]} />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('changes price of an item', () => {
  const wrapper = mount(
    <Provider wishList={wishList} >
      <WishListItemEdit item={wishList.items[0]} />
    </Provider>),
    input = wrapper.find('input[type="number"]');

    input.simulate('change', {target: {value: '27.56'}});
    expect(wishList.items[0].price).toBe(27.56);
});

it('invalid price value does not changes price', () => {
  const wrapper = mount(
    <Provider wishList={wishList} >
      <WishListItemEdit item={wishList.items[0]} />
    </Provider>),
    input = wrapper.find('input[type="number"]');

  input.simulate('change', { target: { value: 'invalid price' } });
  expect(wishList.items[0].price).toBe(0);
});