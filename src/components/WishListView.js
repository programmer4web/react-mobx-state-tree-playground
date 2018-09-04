import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';

import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';
import CategoryEntry from './CategoryEntry';

const List = styled.ul`
    list-style-type: none;
  `,
  Total = styled.div`
    margin-bottom: 24px;
    font-style: italic;
  `;

const WishListView = ({wishlist}) => (
  <List>
    {wishlist.items.map((item, idx) => <WishListItemView key={idx} item={item}/>)}
    <br />
    <hr />
    <Total>Total price: {wishlist.totalPrice.toFixed(2)}</Total>
    <WishListItemEntry wishList={wishlist} />
    <br/>
    <hr/>
    <CategoryEntry />
  </List>
)

export default observer(WishListView);