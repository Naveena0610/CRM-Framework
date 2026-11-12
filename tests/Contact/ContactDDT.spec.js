import{test} from '@playwright/test'
import excel from 'exceljs'
import path from 'node:path'
test('Contact',async ({page}) => {
    test.slow()
     await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'CONTACTS'}).click()

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

         //contact
        
        await page.getByRole('img',{name:'Create Contact'}).click()
        await page.locator("//select [@name='salutationtype']").selectOption({value:Contacts.Title})
        await page.locator("//input[@name='firstname']").fill(Contacts.FirstName)
        await page.locator("//input[@name='lastname']").fill(Contacts.lastName)
        await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()
        let Cname=await page.locator("//span[@class='dvHeaderText']").textContent()
        console.log(Cname);
        if(Cname?.includes(Contacts.FirstName)){
            console.log(Contacts.FirstName+" Contact Created");
            
        }else{
            console.log(Contacts.lastName+" Contact not Created");
            
        }

    } 
   

    //logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
    


})