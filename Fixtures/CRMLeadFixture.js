
import {test as base} from './Login.js'
import { Lead_Class } from '../Pages/leadsclass.js'

export let test=base.extend({
     leadFixture: async ({loginFixture},use) => {
          let leadObj= new Lead_Class(loginFixture)
          use(leadObj)
     }
})