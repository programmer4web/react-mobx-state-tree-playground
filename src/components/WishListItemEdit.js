import React, {Component} from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import categoriesData from '../assets/data.json';
const categories = categoriesData.categories;
const Edit = styled.div`
 
  `,
  Line = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    input {
      padding: 0 12px;
    }
  `,
  Label = styled.label`
    font-size: 13px;
  `,
  Input = styled.input`
    line-height: 18px;
  `

class WishListItemEdit extends Component {
  render() {
    const {item} = this.props;
    return (
      <Edit>
        <Line>
          <Label>Thing: </Label>
          <Input value={item.name} onChange={this.onNameChange}/>
        </Line>
        <Line>
          <Label>Price: </Label>
          <Input type="number" value={item.price} onChange={this.onPriceChange} min={0} />
        </Line>
        <Line>
          <Label>Image: </Label>
          <Input value={item.image} onChange={this.onImageChange}/>
        </Line>
        <Line>
          <Label>Category: </Label>
          <select onChange={this.onCategoryChange} defaultValue="disabled">
            <option value="disabled" disabled="disabled">Select Category</option>
            {categories && categories.map(category => (
              <option value={category.id} key={category.id}>{category.name}</option>)
            )}
          </select>
        </Line>
      </Edit>
    )
  }

  onCategoryChange = event => {
    this.props.item.changeCategory(event.target.value);
  }

  onNameChange = event => {
    this.props.item.changeName(event.target.value);
  }

  onPriceChange = event => {
    const price = parseFloat(event.target.value);
    if(!isNaN(price)){
      this.props.item.changePrice(price);
    } else this.props.item.changePrice(0);
  }

  onImageChange = event => {
    this.props.item.changeImage(event.target.value);
  }
}

export default observer(WishListItemEdit);