import { expect } from "@playwright/test"

export class Org_Class{

    #org
    #createOrg
    #OrgName
    #Phone
    #save
    #validation

     constructor (page){
        this.page=page
        this.#org=page.getByRole('link',{name:'ORGANIZATIONS'})
        this.#createOrg=page.getByRole('img',{name:'Create Organization'})
        this.#OrgName=page.locator("//input[@name='accountname']")
        this.#Phone=page.locator("//input[@id='phone']")
        this.#save=page.locator("(//input[@title='Save [Alt+S]'])[1]")
        this.#validation=page.locator("//span[@class='dvHeaderText']")
     }
     async OrgClick(){
        await this.#org.first().click()

     }

     async  OrgAction(OrgName,phone) {
       
       await this.#createOrg.click()
       await this.#OrgName.fill(OrgName)
        await this.#Phone.fill(phone)
        await this.#save.click()        
     }
      async  validation(OrgName) {
       await expect(this.#validation).toContainText(OrgName)
    }
}