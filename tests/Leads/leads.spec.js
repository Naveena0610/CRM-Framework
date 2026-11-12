import {test} from '@playwright/test'
import { Dropdown } from '../../utils/Dropdown'


test ('leads1',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'Leads'}).click()
   await page.getByRole('img',{name:'Create Lead'}).click()
    //   await page.locator('//select[@name="salutationtype"]').selectOption({value:'Ms.'})
    await  Dropdown(page.locator('//select[@name="salutationtype"]'),'Ms.')
    await page.locator("//input[@name='firstname']").fill('Naveena')
    await page.locator("//input[@name='lastname']").fill('Myneni')
    // let name = await page.locator('//input[@name="lastname"]').inputValue()
    await page.locator("//input[@name='company']").fill('TestYantra')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    let  name =  await page.locator('//span[@class="dvHeaderText"]').textContent('Myneni')
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