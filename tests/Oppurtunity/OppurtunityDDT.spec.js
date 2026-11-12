import {test} from '@playwright/test'
 import logindata from '../../TestData/LoginData.json'
import excel from 'exceljs'
import path from 'node:path'

test('Oppurtunity',async ({page}) => {
    test.slow()

    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logindata.username)
    await page.locator("//input[@name='user_password']").fill(logindata.password)
    await page.locator('#submitButton').click()
    

     let book = new excel.Workbook()
        await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
        let sheet= await book.getWorksheet('Oppurtunites') 
         let data=[]
         for(let i=2;i<=sheet.rowCount;i++){
            let OppurtunityName=await sheet.getRow(i).getCell(1).value
            let OrganisationName=await sheet.getRow(i).getCell(2).value
           
    
            data.push({
                OppurtunityName,OrganisationName
            })      
    
         }

         for(let Oppurtunites of data){

            //create Oppurtunity
            
            await page.getByRole('img',{name:'Create Opportunity'}).click()
            await page.locator("//input[@name='potentialname']").fill(Oppurtunites.OppurtunityName)
            // await page.getByRole('img',{name:'Select'}).click()

            let [newtab1] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('img', { name: 'Select' }).first().click()
            ]);

            await newtab1.waitForLoadState();

            await newtab1.getByRole('link',{name:Oppurtunites.OrganisationName}).click()
            
            await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()


            let OName= await page.locator("//span[@class='dvHeaderText']").textContent()
            console.log(OName);

            
            if (OName?.includes(Oppurtunites.OppurtunityName)) {
            console.log( Oppurtunites.OppurtunityName+'Oppurtunity is created');
            } else {
            console.log(Oppurtunites.OppurtunityName+ 'oppurtunity is not created');
            }

       }
        //! logout
        await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
        await page.locator('//a[text()="Sign Out"]').click()

    
})