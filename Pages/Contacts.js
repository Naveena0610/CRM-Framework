import { expect } from "@playwright/test"
export class contact_class{
    #Contact
    #CreateContact
    #Title
    #ContactFirstname
    #Contactlastname
    #save
    #validation
    constructor( page){
        this.page=page
        this.#Contact=page.getByRole('link',{name:'CONTACTS'})
        this.#CreateContact=page.getByRole('img',{name:'Create Contact'})
        this.#Title=page.locator("//select [@name='salutationtype']")
        this.#ContactFirstname=page.locator("//input[@name='firstname']")
        this.#Contactlastname=page.locator("//input[@name='lastname']")
        this.#save=page.locator("(//input[@title='Save [Alt+S]'])[1]")
        this.#validation= page.locator("//span[@class='dvHeaderText']")
        }
        async ContactClick(){
            await this.#Contact.click()
        }

        async contactAction(title,ContactFirstname,ContactLastName){
            
            await this.#CreateContact.click()
            await this.#Title.selectOption({value:title})
            await this.#ContactFirstname.fill(ContactFirstname)
            await this.#Contactlastname.fill(ContactLastName)
            await this.#save.click()
        }
        async Contactvalidation(ConFname){
          await expect(this.#validation).toContainText(ConFname)
        }
}