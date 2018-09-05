import {types, getEnv, getParent, destroy } from 'mobx-state-tree';

import Category from './Category';

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: types.optional(types.string, ""), // or ""
  category: types.maybe(types.reference(Category))
})
.actions(self => ({
    changeName(newName) {
      self.name = newName;
    },
    changePrice(newPrice) {
      self.price = newPrice;
    },
    changeImage(newImage) {
      self.image = newImage;
    },
    changeCategory(newCategory) {
      self.category = newCategory;
    },
    remove() {
      getParent(self, 2).remove(self)
    }
  })
)


export const WishList = types.model({
    categories: types.array(Category),
    items: types.optional(types.array(WishListItem), [])
  }
)
.actions(self => ({
    add(item) {
      self.items.push(item);
    },
    remove(item) {
      destroy(item);
    },
    addCategory(category){
      const idx = self.categories.length;
      self.categories.push({
        id: idx.toString(),
        name: category.name
      })
    }
  })
).views(self => ({
  get totalPrice() {
    getEnv(this).alert('computed total price.');
    return self.items.reduce((sum, entry) => 
    { return sum + entry.price}, 0)
  }
}
))
