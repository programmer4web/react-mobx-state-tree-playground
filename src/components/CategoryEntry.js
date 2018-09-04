import React, {Component} from 'react';
import {inject} from 'mobx-react';

class CategoryEntry extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <div>
        <input value={this.state.name} onChange={this.onNameChange} placeholder="Category Name" />
        <button onClick={this.onAddCategory}>Add Category</button>
      </div>
    )
  }

  onNameChange = e => {
    this.setState({name: e.target.value});
  }

  onAddCategory = () => {
    const name = this.state.name,
      wishList = this.props.wishList,
      results = wishList.categories.find(category => category.name === name);

    if(!results || results.length === 0) {
      wishList.addCategory({ name: this.state.name });
    } else {
      console.log('category with the same name already exists');
    }
  }
}

export default inject('wishList')(CategoryEntry);