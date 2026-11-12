import { expect } from "@playwright/test"

export class Opp_Class{
    #Opp
    #CreateOpp
    #Oppname
    #OrgName
    #save
    #OppValidation

    constructor(page){
        this.page=page
        this.#Opp= page.getByRole('link',{name:'Opportunities'})
        this.#CreateOpp=page.getByRole('img',{name:'Create Opportunity'})
        this.#Oppname=page.locator("//input[@name='potentialname']")
        this.#OrgName
        this.#OppValidation= page.locator('//span[@class="dvHeaderText"]')

    }
    async OppAction(OppName,OrgName){
        await this.#Opp.click()
        await this.#CreateOpp.click()
        await this.#Oppname.fill(OppName)
        await this.#OrgName.fill(OrgName)
        await this.#save.click()
    }
    async OppValidation(Validation){
        await expect(this.#OppValidation).toContainText(Validation)
        
    }



}