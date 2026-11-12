import {test } from '@playwright/test'
import logiindata from '../../TestData/LoginData.json'
import Organisationdata from '../../TestData/Organisation.json'

test('Organisation',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logiindata.username)
    await page.locator("//input[@name='user_password']").fill(logiindata.password)
    await page.locator('#submitButton').click()

    //create Organisation
    await page.getByRole('link',{name:'Organizations'}).click()
    await page.getByRole('img',{name:'Create Organization'}).click()
    await page.locator("//input[@name='accountname']").fill(Organisationdata.OrganisationName)
    // await page.locator("(//input[@class='detailedViewTextBox'])[2]").fill(Organisationdata.OrganisationNo)
    await page.locator(`(//input[@class="detailedViewTextBox"])[3]`).fill(Organisationdata.WebSite)
    await page.locator("//input[@id='phone']").fill(Organisationdata.Phone)
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()
    let OName= await page.locator("//span[@class='dvHeaderText']").textContent()
    console.log(OName);
    
    if (OName?.includes(Organisationdata.OrganisationName)) {
    console.log('Organisation is created');
    } else {
    console.log('Organisation is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()


})