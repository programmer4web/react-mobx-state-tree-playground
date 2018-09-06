import React, {Component} from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';

import WishListItemEdit from "./WishListItemEdit";
import {WishListItem} from "../models/WishList";

const Editor = styled.div`
  max-width: 250px;
  margin: 24px auto;
`;

class WishListItemEntry extends Component {
  constructor(){
    super();

    this.state = {
      entry: WishListItem.create({
        image: 'http://',
        name: "",
        price: 0
      })
    }
  }

  render() {
    return(
      <Editor>
        <WishListItemEdit item={this.state.entry} />
        <button onClick={this.onAdd}>Add entry</button>
      </Editor>
    )
  }

  onAdd = () => {
    this.props.wishList.add(this.state.entry)
    this.setState({
      entry: WishListItem.create({
        name: '',
        price: 0
      })
    })
  }
}

export default observer(WishListItemEntry);