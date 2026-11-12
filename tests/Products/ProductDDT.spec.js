import {test } from '@playwright/test'

import excel from 'exceljs' 
import path from 'node:path'
test('Organisation',async ({page}) => {
    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'PRODUCTS'}).click()

    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet = await book.getWorksheet('Products')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let ProductName= await sheet.getRow(i).getCell(1).toString()
        let Qty= await sheet.getRow(i).getCell(2).toString()

        data.push({
            ProductName,Qty
        })     
    }

    //Products
    for(let Products of data){
    await page.getByRole('img',{name:'Create Product'}).click()
    await page.locator('//input[@name="productname"]').fill(Products.ProductName)
    await page.locator("//input[@name='qtyinstock']").fill(Products.Qty)
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    let PName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(PName);
    
     if (PName?.includes(Products.ProductName)) {
    console.log(Products.ProductName+ ' is created');
    } else {
    console.log(Products.ProductName+' is not created');
    }
}
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})