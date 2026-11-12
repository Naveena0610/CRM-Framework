export class Login_Class{
    #username
    #password
    #loginbutton
    constructor(page){
        this.page=page
        this.#username=page.locator("//input[@name='user_name']")
        this.#password=page.locator("//input[@name='user_password']")
        this.#loginbutton=page.locator('//input[@id="submitButton"]')
    }
    async launchUrl(url){
        await this.page.goto(url)
    }
    async action(username,password){
      await  this.#username.fill(username)
       await this.#password.fill(password)
       await this.#loginbutton.click()
    }
}