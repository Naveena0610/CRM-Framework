import {test } from '@playwright/test'
import loginData from '../../TestData/LoginData.json'
import { Login_Class } from '../../Pages/loginclass'
import OppData from '../../TestData/Oppurtunities.json'
import { Opp_Class } from '../../Pages/Oppurtunites'

test('Oppurtunites with POM',async ({page}) => {
    
    let loginObj= new Login_Class(page)
    await loginObj.launchUrl(loginData.url)
    await loginObj.action(loginData.username,loginData.password)
    
    let OppObj= new Opp_Class(page)
    await OppObj.OppClick()
    await OppObj.OppAction(OppData.Oppname,OppData.OrgName)
})