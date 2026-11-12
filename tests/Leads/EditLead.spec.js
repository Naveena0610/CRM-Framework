import {test}from '@playwright/test'
test('editLead',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByRole('link',{name:'edit'}).click()
    await page.locator("//input[@name='company']").fill("TestYantra")
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

}) 