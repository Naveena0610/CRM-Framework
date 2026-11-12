export async function Dropdown( locator,value) {
    await locator.selectOption(value)       
}