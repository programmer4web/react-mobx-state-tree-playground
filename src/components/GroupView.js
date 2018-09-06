import React, {Component} from 'react';
import userData from '../assets/users.json';
import UserView from './UserView';
import styled from 'styled-components';

const Group = styled.div`
  display:flex;
  margin: 24px;
`,
StyledUser = styled.div`
  margin-left: 24px;
  color: #5f1832;
`,
Heading = styled.div`
  margin-left: 24px;
`

class GroupView extends Component {
  constructor(props) {
    super(props);
    this.users = userData.users;
  }

  render() {
    return (
      <Group>
        <Heading>Users Group View:</Heading>
        {this.users && this.users.map(user => 
          <StyledUser key={user.id}>
            <UserView user={user} showAttributes={true}/>
          </StyledUser>
        )}
      </Group>
    )
  }
}

export default GroupView;