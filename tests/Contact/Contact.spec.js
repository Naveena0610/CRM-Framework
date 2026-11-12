import{test} from '@playwright/test'
test('Contact',async ({page}) => {
     await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //contact
    await page.getByRole('link',{name:'Contacts'}).click()
    await page.getByRole('img',{name:'Create Contact'}).click()
    await page.locator("//select [@name='salutationtype']").selectOption({value:'Ms.'})
    await page.locator("//input[@name='firstname']").fill('Naveena')
    await page.locator("//input[@name='lastname']").fill('Myneni')
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()
    let Cname=await page.locator("//span[@class='dvHeaderText']").textContent()
    console.log(Cname);
    if(Cname?.includes('Myneni')){
        console.log("Contact Created");        
    }else{
        console.log("Contact not Created");        
    }

    //logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
    


})