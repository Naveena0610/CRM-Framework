import{test as base} from '@playwright/test'
import logindata from '../TestData/LoginData.json'
import { Login_Class } from '../Pages/loginclass'

export  let test=base.extend({
    loginFixture: async ({page},use) => {

        let  loginObj= new Login_Class(page)
        await loginObj.launchUrl(logindata.url)
        await loginObj.action(logindata.username,logindata.password)
        use(page)

    }
})