import React from 'react';
import Enzime, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stateData from '../assets/data.json';
import { WishList } from '../models/WishList';
import WishListItemView from './WishListItemView';

Enzime.configure({ adapter: new Adapter() });

const wishList = WishList.create(stateData, {
  alert: m => console.log(m)
}),
  div = document.createElement('div');

it('instantiates an WishListItemEdit without error', () => {
  ReactDOM.render(<Provider wishList={wishList} >
    <WishListItemView item={wishList.items[1]} />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('onToogleEdit sets isEditing true on state', () => {
  const wrapper = shallow(
    <WishListItemView wishList={wishList} item={wishList.items[1]} />
  );

  expect(wrapper.state('isEditing')).toBe(false);
  const button = wrapper.find('button').first();
  button.simulate('click');
  expect(wrapper.state('isEditing')).toBe(true);
})

it('onCancelEdit sets isEditing false', () => {
  const wrapper = shallow(
    <WishListItemView wishList={wishList} item={wishList.items[1]} />
  );

  const button = wrapper.find('button').first();
  button.simulate('click');
  expect(wrapper.state('isEditing')).toBe(true);
  const cancel = wrapper.find('button').last();
  cancel.simulate('click');
  expect(wrapper.state('isEditing')).toBe(false);
});

it('onSaveEdit sets isEditing false', () => {
  const wrapper = shallow(
    <WishListItemView wishList={wishList} item={wishList.items[1]} />
  );

  const button = wrapper.find('button').first();
  button.simulate('click');
  expect(wrapper.state('isEditing')).toBe(true);
  const save = wrapper.find('button').first();
  save.simulate('click');
  expect(wrapper.state('isEditing')).toBe(false);
  expect(wrapper.state('clone')).toBe(null);
});