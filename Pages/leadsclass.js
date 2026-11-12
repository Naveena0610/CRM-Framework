import { expect } from "@playwright/test"

export class Lead_Class{
    #Lead_button
    #Create_Lead
    #firstname
    #lastname
    #company
    #save
    #validation
    constructor(page){
        this.page=page
         this.#Lead_button=page.locator("(//td[@class='tabUnSelected'])[2]")
        this.#Create_Lead=page.locator("//img[@alt='Create Lead...']")
        this.#firstname=page.locator("//input[@name='firstname']")
        this.#lastname=page.locator("//input[@name='lastname']")
        this.#company=page.locator("//input[@name='company']")
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')
        this.#validation= page.locator('//span[@class="dvHeaderText"]')
    }
    async leadClick(){
          await this.#Lead_button.click()

    }
    async actions(FirstName,LastName,Company){
      
      await this.#Create_Lead.click()
       await  this.#firstname.fill(FirstName)
       await this.#lastname.fill(LastName)
       await this.#company.fill(Company)
       await this.#save.click()

    }
    async  validation(lastname) {
       await expect(this.#validation).toContainText(lastname)
    }
}