import { expect } from "@playwright/test"
export class Product_class{
    #Product
    #CreateProduct
    #Productname
    #Quantity
    #Save
    #validation
    constructor (page){
        this.page=page
        this.#Product=page.getByRole('link',{name:'PRODUCTS'})
        this.#CreateProduct=page.getByRole('img',{name:'Create Product'})
        this.#Productname=page.locator('//input[@name="productname"]')
        this.#Quantity=page.locator("//input[@name='qtyinstock']")
        this.#Save=page.locator("(//input[@title='Save [Alt+S]'])[1]")
        this.#validation= page.locator('//span[@class="lvtHeaderText"]')

    }
    async ProductClick(){
        await this.#Product.click()

    }
    async ProductAction(PName,Qty){
        
        await this.#CreateProduct.click()
        await this.#Productname.fill(PName)
        await this.#Quantity.fill(Qty)
        await this.#Save.click()
    }
    async ProductValidation(Pvalidation){
        await expect(this.#validation).toContainText(Pvalidation)      
    }
}