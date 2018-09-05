import {types} from 'mobx-state-tree';

const AppSettings = types.model({
  showUserAttributes: types.boolean
})

export default AppSettings;