import {test } from '@playwright/test'
import excel from 'exceljs'
import { link } from 'node:fs'
import path from 'node:path'
test('Quotes',async ({page}) => {
    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Quotes 
    await page.locator("(//td[@class='tabUnSelected'])[11]").hover()
    await page.locator("//a[@name='Quotes']").click()

    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet= book.getWorksheet('Quotes')
    let data=[]
    for (let i=2 ;i<=sheet.rowCount;i++){
         let  QuoteName=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()
        // let  discount=await sheet.getRow(i).getCell(8).toString()

        data.push({
            QuoteName,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
            // ,discount
        })  
        
    }
    for (let Quotes of data){
        await page.getByRole('img',{name:'Create Quote'}).click()
        //Quote Information
        await page.locator("//input[@name='subject']").fill(Quotes.QuoteName)
        let [newtab1]=await Promise.all([
            page.waitForEvent('popup'),
            page.locator("(//img[@alt='Select'])[3]").click()
        ])
        await newtab1.getByRole('link',{name:Quotes.OragName}).click()
        page.once('dialog',(dialog)=>{
            dialog.accept()        
            
        })
        //Address Info 
        await page.locator("//textarea[@name='bill_street']").fill(Quotes.BillingAdd)
        await page.locator("//textarea[@name='ship_street']").fill(Quotes.ShippingAdd)

        //Item Details
        await page.getByRole('img',{name:'Products'}).click()
        let [newtab2]=await Promise.all([
            page.waitForEvent('popup'),
            page.locator("(//img[@title='Products'])").click()
        ])
        await newtab2.getByRole('link',{name:Quotes.ProductName}).click()
        await page.locator("#qty1").fill(Quotes.Qty)
        await page.locator("//input[@name='listPrice1']").fill(Quotes.ListPrice)
        //discount
        // await page.locator("(//a[text()='Discount'])[2]").click()
        // await page.locator("(//input[@name='discount_final'])[2]").click()
        // await page.locator("//input[@id='discount_percentage_final']").fill(Quotes.discount)
        // await page.locator(`//img[@onclick="fnHidePopDiv('discount_div_final')"]`).click()
        //save
        await page.locator('(//input[@title="Save [Alt+S]"])[2]').click()

        //validating
        let QName= await page.locator("//span[@class='lvtHeaderText']").textContent()
        console.log(QName);
        
        if (QName?.includes(Quotes.QuoteName)) {
        console.log(Quotes.QuoteName+' is created');
        } else {
        console.log(Quotes.QuoteName+'  is not created');
        }

    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()




})