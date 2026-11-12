import {test } from '@playwright/test'
test('Quotes',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    // Invoice 
    await page.getByRole('link',{name:'More'}).hover()
    await page.locator("//a[@name='Invoice']").click()
    await page.getByRole('img',{name:'Create Invoice'}).click()

     //Invoice Information
    await page.locator("//input[@name='subject']").fill("Invoice1")
    let [newtab1]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("(//img[@alt='Select'])[3]").click()
    ])
    await newtab1.locator("//a[text()='QSpiders']").click()
      page.once('dialog',(dialog)=>{
        dialog.accept()        
        
     })
     //Address Info 
     await page.locator("//textarea[@name='bill_street']").fill('Gachibowli,Hyderabad')
    await page.locator("//textarea[@name='ship_street']").fill('Jntu,Hyderabad')

    //Item Details
    
    let [newtab2]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("//img[@title='Products']").click()
    ])
    await newtab2.locator("//a[@id='popup_product_18']").click()
    await page.locator("#qty1").fill('1')
    await page.locator("//input[@name='listPrice1']").fill('987654')

    await page.locator("(//a[text()='Discount'])[2]").click()
    await page.locator("(//input[@name='discount_final'])[2]").click()
    await page.locator("#discount_percentage_final").fill('2')


    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let IName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(IName);
    
     if (IName?.includes('Invoice1')) {
    console.log('Invoice is created');
    } else {
    console.log('invoice is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})