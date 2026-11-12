import {test } from '@playwright/test'
import { windowHandling } from '../../utils/window'

test('Quotes',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Quotes 
    await page.getByRole('link',{name:'More'}).hover()
    await page.locator("//a[@name='Quotes']").click()
    await page.getByRole('img',{name:'Create Quote'}).click()
    //Quote Information
    await page.locator("//input[@name='subject']").fill("Quote123")
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
    await page.getByRole('img',{name:'Products'}).click()
    let [newtab2]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("(//img[@title='Products'])").click()
    ])
    await newtab2.locator("//a[@id='popup_product_17']").click()
    await page.locator("#qty1").fill('2')
    await page.locator("//input[@name='listPrice1']").fill('2000')
     //discount
    await page.locator("(//a[text()='Discount'])[2]").click()
    await page.locator("(//input[@name='discount_final'])[2]").click()
    await page.locator("#discount_percentage_final").fill('2')
    await page.locator(`//img[@onclick="fnHidePopDiv('discount_div_final')"]`).click()
    //save
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let QName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(QName);
    
     if (QName?.includes('Quote12')) {
    console.log('Quote is created');
    } else {
    console.log('Quote is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()




})

test.only('Quotes utils',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Quotes 
    await page.getByRole('link',{name:'More'}).hover()
    await page.locator("//a[@name='Quotes']").click()
    await page.getByRole('img',{name:'Create Quote'}).click()
    //Quote Information
    await page.locator("//input[@name='subject']").fill("Quote123")
    let newtab1 = await windowHandling(page,page.locator("(//img[@alt='Select'])[3]").click())
    await newtab1.getByRole('link',{name:'IBM'}).click()
      page.once('dialog',(dialog)=>{
        dialog.accept()        
     })
     //Address Info 
     await page.locator("//textarea[@name='bill_street']").fill('Gachibowli,Hyderabad')
    await page.locator("//textarea[@name='ship_street']").fill('Jntu,Hyderabad')

    //Item Details
    await page.getByRole('img',{name:'Products'}).click()
     let newtab2 = await windowHandling(page,page.locator("(//img[@align='absmiddle'])[6]").click())
    await newtab2.getByRole('link',{name:'Dell'}).first().click()
    await page.locator("#qty1").fill('2')
    await page.locator("//input[@name='listPrice1']").fill('2000')
     //discount
    await page.locator("(//a[text()='Discount'])[2]").click()
    await page.locator("(//input[@name='discount_final'])[2]").click()
    await page.locator("#discount_percentage_final").fill('2')
    await page.locator(`//img[@onclick="fnHidePopDiv('discount_div_final')"]`).click()
    //save
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let QName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(QName);
    
     if (QName?.includes('Quote12')) {
    console.log('Quote is created');
    } else {
    console.log('Quote is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()




})