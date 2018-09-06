import React, { Component } from 'react';
import {inject} from 'mobx-react';
import styled from 'styled-components';

import logo from '../assets/logo.svg';
import UserView from './UserView';
import GroupView from './GroupView';
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
  display: flex;
  justify-content: space-around;
  background-color: #222;
  min-height: 150px;
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
    const showUserAttributes = this.props.appSettings.showUserAttributes;
    return (
      <Application>
        <AppHeader>
          <Img src={logo} alt="logo" height={70}/>
          <Title>React Mobx-state-tree Playground</Title>
          <UserView user={this.props.user} showAttributes={showUserAttributes} />
        </AppHeader>
        <WishListView wishlist={this.props.wishList} />
        <GroupView />
      </Application>
    );
  }
}

export default inject('wishList', 'appSettings', 'user')(App);
