import {test } from '@playwright/test'
import{window, windowHandling} from '../../utils/window'
import { link } from 'node:fs'
test('Quotes',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Sales Order 
    await page.locator("(//td[@class='tabUnSelected'])[11]").hover()
    await page.locator("//a[@name='Sales Order']").click()
    await page.getByRole('img',{name:'Create Sales Order'}).click()

     //Sales Order Information
    await page.locator("//input[@name='subject']").fill("Stock")
    let [newtab1]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("(//img[@alt='Select'])[4]").click()
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
        page.locator("//img[@title='Products']").click()
    ])
    await newtab2.locator("//a[@id='popup_product_17']").click()
    await page.locator("#qty1").fill('2')
    await page.locator("//input[@name='listPrice1']").fill('2000')
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let SOName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(SOName);
    
     if (SOName?.includes('Stock')) {
    console.log('Sales Order is created');
    } else {
    console.log('Sales Order is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()



})
test.only('Quotes Utils',async ({page}) => {
    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Sales Order 
    await page.locator("(//td[@class='tabUnSelected'])[11]").hover()
    await page.locator("//a[@name='Sales Order']").click()
    await page.getByRole('img',{name:'Create Sales Order'}).click()

     //Sales Order Information
    await page.locator("//input[@name='subject']").fill("Stock")
    let newtab1= await windowHandling(page,page.locator( "(//img[@alt='Select'])[4]").click())
    await newtab1.getByRole('link',{name:'IBM'}).click()
      page.once('dialog',(dialog)=>{
        dialog.accept() 
     })
     //Address Info 
     await page.locator("//textarea[@name='bill_street']").fill('Gachibowli,Hyderabad')
    await page.locator("//textarea[@name='ship_street']").fill('Jntu,Hyderabad')

    //Item Details
    await page.getByRole('img',{name:'Products'}).click()
    let newtab2= await windowHandling(page,page.locator("//img[@title='Products']").click())
    await newtab2.getByRole('link',{name:'Dell laptop'}).click()
    await page.locator("#qty1").fill('2')
    await page.locator("//input[@name='listPrice1']").fill('2000')
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let SOName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(SOName);
    
     if (SOName?.includes('Stock')) {
    console.log('Sales Order is created');
    } else {
    console.log('Sales Order is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()



})