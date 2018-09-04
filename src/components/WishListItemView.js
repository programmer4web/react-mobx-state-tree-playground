import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';
import styled from 'styled-components';

import WishListItemEdit from './WishListItemEdit';

const Editor = styled.div`
    max-width: 250px;
    margin: 24px auto;
    
    button {
      margin-right: 12px;
    }
  `, 
  Item = styled.li`
    display: inline-block;
    margin: 24px;
    max-width: 256px;

    button {
      margin-right: 12px;
    }
  `,
  Category = styled.div`
    margin-bottom: 12px;
    font-weight: bold;
  `,
  Price = styled.div`
    margin-bottom: 12px;
    font-weight: bold;
  `;

class WishListItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  render() {
    const {item} = this.props;
    return this.state.isEditing ? (
      this.renderEditable()
    ) : (
      <Item>
        { item.image && <img src={item.image} width={150} alt=" "/>}
        <h3>{item.name}</h3>
        {item.category && <Category>Category: {item.category.name}</Category>}
        <Price>Price: {item.price}</Price>
        <button onClick={this.onToggleEdit} >Edit</button>
        <button onClick={item.remove}>Remove</button>
      </Item>
    
    )
  }

  renderEditable () {
    return (
      <Editor>
        <h4>Edit item:</h4>
        <WishListItemEdit item={this.state.clone} />
        <button onClick={this.onSaveEdit}>Save</button>
        <button onClick={this.onCancelEdit}>Cancel</button>
      </Editor>
    )
  } 

  onToggleEdit= () => {
    
    this.setState({
      isEditing: true,
      clone: clone(this.props.item)
    })
  }

  onCancelEdit = () => {
    this.setState({ isEditing: false })
  }

  onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))
    this.setState({
      isEditing: false,
      clone: null
    })
  }
}

export default observer(WishListItemView);