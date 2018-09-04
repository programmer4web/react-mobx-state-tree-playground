import {types} from 'mobx-state-tree';

const Category = types.model({
  id: types.identifier,
  name: types.string
});

export default Category;