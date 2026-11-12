import {test } from '@playwright/test'
import excel from 'exceljs'
import { link } from 'node:fs'
import path from 'node:path'
import { windowHandling } from '../../utils/window'


test.only('Quotes',async ({page}) => {

    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Sales Order 
    await page.locator("(//td[@class='tabUnSelected'])[11]").hover()
    await page.locator("//a[@name='Sales Order']").click()

    let book= new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet=await book.getWorksheet('SalesOrder')
    let data=[]

    for(let i=2;i<=sheet.rowCount;i++){

        let  Subject=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()

        data.push({
            Subject,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
        })

    }
    for(let Sales of data){    
    await page.getByRole('img',{name:'Create Sales Order'}).click()

     //Sales Order Information
    await page.locator("//input[@name='subject']").fill(Sales.Subject)

    let [newtab1]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("(//img[@alt='Select'])[4]").click()
    ])
    await newtab1.getByRole('link',{name:Sales.OragName}).click()
      page.once('dialog',(dialog)=>{
        dialog.accept()        
        
     })
     //Address Info 
    await page.locator("//textarea[@name='bill_street']").fill(Sales.BillingAdd)
    await page.locator("//textarea[@name='ship_street']").fill(Sales.ShippingAdd)

    //Item Details
    await page.getByRole('img',{name:'Products'}).click()
    let [newtab2]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("//img[@title='Products']").click()
    ])
    await newtab2.getByRole('link',{name:Sales.ProductName}).click()
    await page.locator("#qty1").fill(Sales.Qty)
    await page.locator("//input[@name='listPrice1']").fill(Sales.ListPrice)
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let SOName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(SOName);
    
     if (SOName?.includes(Sales.Subject)) {
    console.log(Sales.Subject +' is created');
    } else {
    console.log(Sales.Subject +' is not created');
    }
    }
    
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})

test('Quotes utils',async ({page}) => {

    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Sales Order 
    await page.locator("(//td[@class='tabUnSelected'])[11]").hover()
    await page.locator("//a[@name='Sales Order']").click()

    let book= new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet=await book.getWorksheet('SalesOrder')
    let data=[]

    for(let i=2;i<=sheet.rowCount;i++){

        let  Subject=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()

        data.push({
            Subject,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
        })

    }
    for(let Sales of data){    
    await page.getByRole('img',{name:'Create Sales Order'}).click()

     //Sales Order Information
    await page.locator("//input[@name='subject']").fill(Sales.Subject)

    let [newtab1]=await windowHandling(page,page.locator("(//img[@alt='Select'])[4]").click())
    await newtab1.getByRole('link',{name:Sales.OragName}).click()
      page.once('dialog',(dialog)=>{
        dialog.accept() 
     })
     //Address Info 
    await page.locator("//textarea[@name='bill_street']").fill(Sales.BillingAdd)
    await page.locator("//textarea[@name='ship_street']").fill(Sales.ShippingAdd)

    //Item Details
    await page.getByRole(img,{name:'Products'}).click()
    let [newtab2]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("//img[@title='Products']").click()
    ])
    await newtab2.getByRole('link',{name:Sales.ProductName}).click()
    await page.locator("#qty1").fill(Sales.Qty)
    await page.locator("//input[@name='listPrice1']").fill(Sales.ListPrice)
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    //validating
    let SOName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(SOName);
    
     if (SOName?.includes(Sales.Subject)) {
    console.log(Sales.Subject +' is created');
    } else {
    console.log(Sales.Subject +' is not created');
    }
    }
    
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})