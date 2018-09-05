import React, {Component} from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const User = styled.div`
  margin-bottom: 12px;
`,
  Name = styled.h5`
    margin-bottom: 6px;
    font-size: 16px;
  `,
  Attribute = styled.div`
    margin-bottom: 6px;
    font-size: 13px
  `;

class UserView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user,
      showAttributes = this.props.showAttributes;
    return (
      <User>
        <Name>{user.name}</Name>
        {showAttributes && <div>
            <Attribute> Gender: {user.gender}</Attribute>
            <Attribute>User id: {user.id}</Attribute>
          </div>
        }
      </User>
    )
  }
}

export default inject('user')(UserView);