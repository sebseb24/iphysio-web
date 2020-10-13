const { assert } = require("console");
const {Builder,  By, Key, util, until} = require("selenium-webdriver");

async function testBadLogin() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:4200");
    let username = await driver.findElement(By.name("email"));
    let password = await driver.findElement(By.name("hash"));

    await username.sendKeys("XXXX");
    await password.sendKeys("XXXX");

    await driver.findElement(By.name("btnConnexion")).click();

    driver.wait(until.elementLocated(By.id("idLblBadPass")), 
                5000).then((elementLocated) => {
                    elementLocated.getText().then((text) => {
                        assert(text == "Adresse courriel et/ou mot de passe invalide", "Login message d'erreur invalide : "+ text );
                        driver.close();
                    });
                                        
                }).catch((erreur) => {
                    console.log(erreur);
                    assert(1==2, "Erreur impossible de localiser le message d'erreur")
                    console.log("fini");
                });
}

async function testLogin() {    
 
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:4200");
    let username = await driver.findElement(By.name("email"));
    let password = await driver.findElement(By.name("hash"));

    await username.sendKeys("admin");
    await password.sendKeys("admin");

    await driver.findElement(By.name("btnConnexion")).click();

    driver.wait( until.elementLocated(By.id('idAjoutPatient')),
       5000).then(ele => { 
                ele.getText().then(text => {
                    assert(text.includes("Nouveau patient"), "le bouton d'ajout de patient contient le texte : " + text);
                    driver.close();
                })
                
            }).catch( err => {
                console.log(err);
                assert(1==2, "Erreur impossible de se connecter avec l'utilisateur admin admin");
                driver.close();
            });
}

testBadLogin();
testLogin();
