import {test } from '@playwright/test'
import loginData from '../../TestData/LoginData.json'
import Orgdata from '../../TestData/Organisation.json'
import { Org_Class } from '../../Pages/OrgClass'
import { Login_Class } from '../../Pages/loginclass'
import excel from 'exceljs'
import path from 'node:path'

test('Organisation with POM',async ({page}) => {

    let loginobj=new Login_Class(page)
    await loginobj.launchUrl(loginData.url)
    await loginobj.action(loginData.username,loginData.password)

    let OrgObj=new Org_Class(page)
    await OrgObj.OrgClick()
    await OrgObj.OrgAction(Orgdata.OrganisationName,Orgdata.Phone)
    await OrgObj.validation(Orgdata.OrganisationName)


    
})
test.only('Organisation with POM Excel',async ({page}) => {
 test.slow()
    let loginobj=new Login_Class(page)
    await loginobj.launchUrl(loginData.url)
    await loginobj.action(loginData.username,loginData.password)

    let OrgObj=new Org_Class(page)
    OrgObj.OrgClick()
     let book = new excel.Workbook()
            await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
            let sheet= await book.getWorksheet('Organisation') 
            let data=[]
    
             for(let i=2;i<=sheet.rowCount;i++){
                let OrganisatName=await sheet.getRow(i).getCell(1).toString()
                // let organisationNo =await sheet.getRow(i).getCell(2).toString()
                // let website=await sheet.getRow(i).getCell(2).toString()
                 let phone=await sheet.getRow(i).getCell(2).toString()
        
                data.push({
                    OrganisatName,phone
                })      
        
                } 
    
                for( let Organisations of data){

                    await OrgObj.OrgAction(Organisations.OrganisatName,Organisations.phone)
                    await OrgObj.validation(Organisations.OrganisatName)

                } 


    
})