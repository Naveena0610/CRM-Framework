import {test} from '@playwright/test'
 import logindata from '../../TestData/LoginData.json'
import excel from 'exceljs'
import path from 'node:path'

test ('leads',async ({page}) => {
    test.slow()

     await page.goto(logindata.url)       
     await page.locator("//input[@name='user_name']").fill(logindata.username)
     await page.locator("//input[@name='user_password']").fill(logindata.password)
     await page.locator('#submitButton').click()

    let book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet= await book.getWorksheet('Leads') 
     let data=[]
     for(let i=2;i<=sheet.rowCount;i++){
        let Title=await sheet.getRow(i).getCell(1).value
        let FirstName=await sheet.getRow(i).getCell(2).value
        let lastName =await sheet.getRow(i).getCell(3).value
        let Company=await sheet.getRow(i).getCell(4).value

        data.push({
             Title,FirstName,lastName,Company
        })      

     }

     for(let leads of data){

        await page.getByRole('link',{name:'Leads'}).first().click()
        await page.getByRole('img',{name:'Create Lead'}).click()
        await page.locator('//select[@name="salutationtype"]').selectOption({value:leads.Title})
        await page.locator("//input[@name='firstname']").fill(leads.FirstName)
        await page.locator("//input[@name='lastname']").fill(leads.lastName)
        await page.locator("//input[@name='company']").fill(leads.Company)
        await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

            let  name =  await page.locator('//span[@class="dvHeaderText"]').textContent()
            console.log(name);
            //! validating the lead
            if (name?.includes(leads.FirstName)) {
            console.log(leads.FirstName+' is created');
            } else {
            console.log(leads.FirstName+' is not created');
            }    
       
        } 
        
      
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})