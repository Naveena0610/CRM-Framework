 import {test} from '@playwright/test'
 import logindata from '../../TestData/LoginData.json'
 import LeadData from '../../TestData/LeadData.json'

test.only ('leads2',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logindata.username)
    await page.locator("//input[@name='user_password']").fill(logindata.password)
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'Leads'}).click()
   await page.getByRole('img',{name:'Create Lead'}).click()
      await page.locator('//select[@name="salutationtype"]').selectOption({value:'Ms.'})
    await page.locator("//input[@name='firstname']").fill(LeadData.Fistname)
    await page.locator("//input[@name='lastname']").fill(LeadData.LastName)
    // let name = await page.locator('//input[@name="lastname"]').inputValue()
    await page.locator("//input[@name='company']").fill('TestYantra')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    let  name =  await page.locator('//span[@class="dvHeaderText"]').textContent()
    console.log(name);
    //! validating the lead
    if (name?.includes('Myneni Naveena')) {
    console.log('lead is created');
    } else {
    console.log('lead is not created');
    }
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})