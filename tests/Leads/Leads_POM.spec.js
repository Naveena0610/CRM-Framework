import {test} from '@playwright/test'
import loginData from '../../TestData/LoginData.json'
import leadData from '../../TestData/LeadData.json'
import { Login_Class } from '../../Pages/loginclass'
import { Lead_Class } from '../../Pages/leadsclass.js'
import excel from 'exceljs'
import path from 'node:path'

test('POM with Json',async ({page}) => {

    let loginobj=new Login_Class(page)
    await loginobj.launchUrl(loginData.url)
    await loginobj.action(loginData.username,loginData.password)

    let leadobj=new Lead_Class(page)
    await  leadobj.actions(leadData.Fistname,leadData.LastName,leadData.Company)
    await leadobj.validation(leadData.LastName)   


})


test('POM with Excel',async ({page}) => {
    test.slow()

    let loginobj=new Login_Class(page)
    await loginobj.launchUrl(loginData.url)
    await loginobj.action(loginData.username,loginData.password)
    let leadobj=new Lead_Class(page)
    leadobj.leadClick()

    let book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet= await book.getWorksheet('Leads') 
    let leads = []
    
        for (let row = 2; row <= sheet.rowCount; row++) {
    
            let firstname = sheet.getRow(row).getCell(2).value
            let lastname = sheet.getRow(row).getCell(3).value
            let company = sheet.getRow(row).getCell(4).value
    
            leads.push({
                firstname,
                lastname,
                company
            })
        }
    
        console.log(leads)
         for (let lead of leads) {    
            console.log('Creating Lead:', lead.firstname) 
            await  leadobj.actions(lead.firstname,lead.lastname,lead.company)
            await leadobj.validation(lead.firstname)         
        }
})