import {WishListItem, WishList} from './WishList'
import {getSnapshot, onSnapshot, onPatch} from "mobx-state-tree";
import { reaction } from 'mobx';

it('can create an instance of the model', () => {
  const item = WishListItem.create({
    "name": "Cronicles of Narnia Box Set",
    "price": 28.73,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51YGwxKn3CL._SX258_BO1,204,203,200_.jpg"
  })

  expect(item.price).toBe(28.73);
  item.changeName('Narnia');
  expect(item.name).toBe('Narnia');

})

// it('can create an wishlist', () => {
//   const states = [];
//   const list = WishList.create({
//     items: [{
//     "name": "Cronicles of Narnia Box Set",
//     "price": 28.73,
//     "image": "https://images-na.ssl-images-amazon.com/images/I/51YGwxKn3CL._SX258_BO1,204,203,200_.jpg"
//     }]
//   })

//   onSnapshot(list, snapshot => {
//     states.push(list)
//   })

//   expect(list.items.length).toEqual(1);
//   expect(getSnapshot(list)).toMatchSnapshot();
//   expect(states).toMatchSnapshot();
// })

it('can add new items', ()=> {
  const list = WishList.create();
  list.add(
    WishListItem.create({
      name: 'Chesterton',
      price: 12
    })
  )

  expect(list.items.length).toBe(1);
  list.items[0].changeImage('test');
  expect(list.items[0].image).toBe('test');
})

it('can add new items 2', () => {
  const list = WishList.create(),
  patches = [];
  list.add(
    WishListItem.create({
      name: 'Chesterton',
      price: 12
    })
  )


  onPatch(list, patch => {
    patches.push(list)
  })

 list.items[0].changeName("The book with new name");
expect(patches).toMatchSnapshot();
})


it('can calculate total Price', () => {
  const list = WishList.create();
  list.add(
    WishListItem.create({
      name: 'Chesterton',
      price: 12
    })
  )
  list.add(
    {
      name: 'Sana',
      price: 3
    }
  )

  expect(list.totalPrice).toBe(15);
  let changed = 0;
  reaction(()=> list.totalPrice, () => changed++)
  console.log(changed);
  list.items[0].changeName('Gefanada');
  console.log(changed);
})