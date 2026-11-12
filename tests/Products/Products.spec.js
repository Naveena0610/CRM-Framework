import {test } from '@playwright/test'
import{window} from '../../utils/window'
test('Products',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()

    //Products
    await page.getByRole('link',{name:'PRODUCTS'}).click()
    await page.getByRole('img',{name:'Create Product'}).click()
    await page.locator("//input[@name='productname']").fill("Phones")

    await page.locator("//input[@name='file_0']").setInputFiles('C:/Users/Malleshwari/OneDrive/Desktop/m3JavaScript/TestData/Product2.txt','C:/Users/Malleshwari/OneDrive/Desktop/m3JavaScript/TestData/Product1.txt')
    
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    let PName= await page.locator("//span[@class='lvtHeaderText']").textContent()
    console.log(PName);
    
     if (PName?.includes('Phones')) {
    console.log('Product is created');
    } else {
    console.log('Product is not created');
    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()




})
