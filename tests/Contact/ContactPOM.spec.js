import {test} from '@playwright/test'
import { Login_Class } from '../../Pages/loginclass'
import { contact_class } from '../../Pages/Contacts'
import logindata from '../../TestData/LoginData.json'
import contactdata from '../../TestData/Contacts.json'
import excel from 'exceljs'
import path from 'node:path'


test('Contact with POM ',async ({page}) => {
    let LoginObj= new Login_Class(page)
    await LoginObj.launchUrl(logindata.url)
     await LoginObj.action(logindata.username,logindata.password)


    let ContactObj= new contact_class(page)
     await ContactObj.contactAction(contactdata.Title,contactdata.ContactFirstname,contactdata.Contactlastname)
    await ContactObj.Contactvalidation(contactdata.ContactFirstname)
    
})

test.only('Contact with POM  Excel',async ({page}) => {
    test.slow()
    let LoginObj= new Login_Class(page)
    await LoginObj.launchUrl(logindata.url)
     await LoginObj.action(logindata.username,logindata.password)


    let ContactObj= new contact_class(page)
    ContactObj.ContactClick()


    let book= new excel.Workbook()
        await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
        let sheet= book.getWorksheet('Contacts')
         let data=[]
    
        for(let i=2;i<=sheet.rowCount;i++){
    
            let Title=await sheet.getRow(i).getCell(1).toString()
            let FirstName=await sheet.getRow(i).getCell(2).toString()
            let lastName =await sheet.getRow(i).getCell(3).toString()
    
            data.push({
                 Title,FirstName,lastName
            }) 
               
        }    
        for(let Contacts of data){
                await ContactObj.contactAction(Contacts.Title,Contacts.FirstName,Contacts.lastName)
                await ContactObj.Contactvalidation(Contacts.FirstName)
        }
    
})