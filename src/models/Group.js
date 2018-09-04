import {types} from "mobx-state-tree";

import {WishList} from './WishList';

const User = types.model({
  id: types.string,
  name: types.string,
  gender: types.enumeration("gender", ["m", "f"]),
  wishList: types.optional(WishList, {})
})

const Group = types.model({
  users: types.Map(User)
})