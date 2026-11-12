import {test } from '@playwright/test'
import logindata from '../../TestData/LoginData.json'
import { Login_Class } from '../../Pages/loginclass'
import ProductData from '../../TestData/Prodcut.json'
import { Product_class } from '../../Pages/Product'
import excel from 'exceljs' 
import path from 'node:path'

test('Product with JSON',async ({page}) => {
    let loginObj= new Login_Class(page)
     await loginObj.launchUrl(logindata.url)
      await loginObj.action(logindata.username,logindata.password)
 
     let ProductObj= new Product_class(page)
     await ProductObj.ProductAction(ProductData.Productname,ProductData.Quantity)
     await ProductObj.ProductValidation(ProductData.Productname)
    
})
test.only('Product with POM EXCEL',async ({page}) => {
    test.slow()
    let loginObj= new Login_Class(page)
     await loginObj.launchUrl(logindata.url)
      await loginObj.action(logindata.username,logindata.password)
 
     let ProductObj= new Product_class(page)
     ProductObj.ProductClick()

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

            await ProductObj.ProductAction(Products.ProductName,Products.Qty)
            await ProductObj.ProductValidation(Products.ProductName)

         }
    
})