import React, { Component } from 'react';
import {inject} from 'mobx-react';
import styled from 'styled-components';

import logo from '../assets/logo.svg';
import WishListView from './WishListView';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff7f50; // coral
`,
Application = styled.div`
  text-align: center;
  font-family: sans-serif;
`,
AppHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`,
Img = styled.img`
padding: 10px;
animation: App-logo-spin infinite 100s linear;
@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`

class App extends Component {
  render() {
    return (
      <Application>
        <AppHeader>
          <Img src={logo} alt="logo" height={70}/>
          <Title>React Mobx-state-tree Playground</Title>
        </AppHeader>
        <WishListView wishlist={this.props.wishList} />
      </Application>
    );
  }
}

export default inject('wishList')(App);
