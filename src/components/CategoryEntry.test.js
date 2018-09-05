import React from 'react';
import Enzime, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CategoryEntry from './CategoryEntry';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import stateData from '../assets/data.json';
import {WishList} from '../models/WishList';

Enzime.configure({ adapter: new Adapter() });

const wishList = WishList.create(stateData, {
    alert: m => console.log(m)
  }),
  div = document.createElement('div');

it('instantiates an CategoryEntry without error', () => {
  ReactDOM.render(<Provider wishList={wishList} ><CategoryEntry /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('onAddCategory adds new category', () => {
  const length = wishList.categories.length,
    wrapper = mount(<Provider wishList={wishList} ><CategoryEntry /></Provider>),
    button = wrapper.find('button');

  const input = wrapper.find('input'),
    e  = {target:{value: 'New Category'}};

  input.simulate('change', e);
  button.simulate('click');
  const categories = wishList.categories;
  expect(categories.length).toEqual(length+1);
  expect(categories[length].name).toBe('New Category');
});

it('onAddCategory does not add category that already exists', () => {
  const length = wishList.categories.length,
    wrapper = mount(<Provider wishList={wishList} ><CategoryEntry /></Provider>),
    button = wrapper.find('button');

  const input = wrapper.find('input'),
    e = { target: { value: 'Books' } };

  input.simulate('change', e);
  button.simulate('click');
  const categories = wishList.categories;
  expect(categories.length).toEqual(length);
});

