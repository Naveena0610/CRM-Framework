import {test as base} from './Login.js'
import { Org_Class } from '../Pages/OrgClass.js'

export let test = base.extend ({
    orgfixture: async({loginFixture},use)=>{
        let orgobj = new Org_Class(loginFixture)
        use(orgobj)

    }
})