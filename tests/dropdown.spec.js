const{test, expect} = require("@playwright/test")

test('meenakshi dropdown @smoke test',async ({page})=>{
     const productName = 'ZARA COAT 3';
    const productName1 = 'ADIDAS ORIGINAL'
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("anshika@gmail.com")
    await page.locator("#userPassword").fill("Iamking@000")
    await page.locator("#login").click()

    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(await titles.length);
    let listOfProduct= await page.locator(".card-body") 
    let productcount = await listOfProduct.count()
    console.log(productcount)
    for(let i=0;i<productcount;i++){
        if(await listOfProduct.nth(i).locator("b").textContent() === productName ){
            listOfProduct.nth(i).locator("text= Add To Cart").click()
            listOfProduct.nth(i).locator("text= Add To Cart",{state:'attached'})
        }
    }
    await page.locator("[routerlink*='cart']").waitFor()
    await page.locator("[routerlink*='cart']").click()
    //await page.pause();
    await page.locator("div li").nth(1).waitFor()
    await page.locator("div[class*='cartSection'] h3").first().isVisible()

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind")
    const dropdown = await page.locator('.ta-results')
    await dropdown.waitFor()
   // const drop = await page.locator("section[class*='ta-results'] button span").last().waitFor().allTextContents
    const optioncount = await dropdown.locator("button").count()   //   .waitFor().count
    console.log("count " + optioncount)
    for(let i=0;i<optioncount;i++){
        const text= await dropdown.locator("button").nth(i).textContent()
        console.log("text", text)
        if(text==="India"){
            await dropdown.locator("button").nth(i).click()
            console.log("text", text)
            break
        }

    }
    

})