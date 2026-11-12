import {test} from '@playwright/test'

test('Oppurtunity',async ({page}) => {

    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //create Oppurtunity
    await page.getByRole('link',{name:'OPPORTUNITIES'}).click()
    await page.getByRole('img',{name:'Create Opportunity'}).click()
    await page.locator("//input[@name='potentialname']").fill('Phones')
    // await page.getByRole('img',{name:'Select'}).click()

   let [newtab1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('img', { name: 'Select' }).first().click()
    ]);

    await newtab1.waitForLoadState();

    await newtab1.getByRole('link',{name:'QSpidersss'}).click()
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()


    let OName= await page.locator("//span[@class='dvHeaderText']").textContent()
    console.log(OName);

    
    if (OName?.includes('Phones')) {
    console.log('Oppurtunity is created');
    } else {
    console.log('oppurtunity is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

    
})