const { StylesCompileDependency } = require("@angular/compiler");
const { SelectMultipleControlValueAccessor } = require("@angular/forms");
const { assert } = require("console");
const {Builder,  By, Key, util, until} = require("selenium-webdriver");
const crypto = require("crypto");

const siteUrl = "http://localhost:4200";

async function testBadLogin() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(siteUrl);
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
    await driver.get(siteUrl);
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

async function testArchive() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(siteUrl);
    let username = await driver.findElement(By.name("email"));
    let password = await driver.findElement(By.name("hash"));

    await username.sendKeys("admin");
    await password.sendKeys("admin");

    await driver.findElement(By.name("btnConnexion")).click();

    driver.wait( until.elementLocated(By.id('idAjoutPatient')),
       5000).then(ele => { 
                ele.getText().then(text => {
                    assert(text.includes("Nouveau patient"), "le bouton d'ajout de patient contient le texte : " + text);
                    
                    driver.findElement(By.id("autocomplete")).then((el) => {

                        el.findElement(By.xpath("//input")).then( (input) => {

                            input.sendKeys("Billy Mailhot").then(() => {
                                driver.wait(until.elementLocated(By.xpath("//*[@id=\"autocomplete\"]/div[1]/div[2]/ul/li[1]/div/a")), 5000).then((searchResult) => {
                                    searchResult.click();

                                    driver.wait(until.elementLocated(By.id('btnEditPatient')), 5000).then((ele) => {
                                        
                                        driver.findElement(By.xpath('//*[@id="btnEditPatient"]/i')).then((btnEditPatient) => {
                                            btnEditPatient.click().then(() => {
                                                driver.findElement(By.id('btnArchiverPatient')).then((btnArchiver) => {
                                                    btnArchiver.click().then(() => {
                                                        driver.navigate().refresh().then(() => {
                                                            driver.findElement(By.xpath('//*[@id=\"autocomplete\"]//input')).then((search) => {
                                                                search.sendKeys("Billy Mailhot").then(() => {
                                                                    driver.findElement(By.xpath("//*[@id=\"autocomplete\"]/div[1]/div[2]/ul/li[1]/div/a")).then((result) => {
                                                                        
                                                                        assert(1==2, "L'utilisateur devrait être archiver, mais est accessible via la barre de recherche");
                                                                    
                                                                    }).catch((NoSuchElementError) => {

                                                                        assert(NoSuchElementError.name =="NoSuchElementError", "Le patient ne semble pas être bien archivé");

                                                                        driver.findElement(By.id('btnPageArchive')).then((element) => {
                                                                            element.click().then(() => {

                                                                                driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Billy Mailhot')]")), 5000).then(() => {
                                                                                    driver.findElement(By.xpath("//*[contains(text(), 'Billy Mailhot')]")).then((ele) => {


                                                                                        ele.findElement(By.xpath("./*")).then((toggle) => {
                                                                                            toggle.getAttribute("ng-reflect-model").then((val) => {
                                                                                                //console.log(val);
                                                                                                assert(val === "false", "Le togle du patient devrait être à false");
                                                                                                toggle.click().then(() => {
                                                                                                    driver.findElement(By.id("btnArchiveSauvegarder")).then((btnSave) => {
                                                                                                        btnSave.click().then(() => {
                                                                                                            driver.findElement(By.id("autocomplete")).then((el) => {
                                                                                                               el.findElement(By.xpath("//input")).then( (input) => {
                                                                                                                   input.clear();
                                                                                                                   input.sendKeys("Billy Mailhot").then(() => {
                                                                                                                        driver.wait(until.elementLocated(By.xpath("//*[@id=\"autocomplete\"]/div[1]/div[2]/ul/li[1]/div/a")), 5000).then((searchResult) => {
                                                                                                                            
                                                                                                                            searchResult.click().then(() => {
                                                                                                                                driver.close();
                                                                                                                            });
                                                                                                                        }).catch(err => {
                                                                                                                            assert(1==2, "Erreur impossible de localiser l'utilisateur apres archive et désarchive du patient par la barre de recherche");
                                                                                                                        });
                                                                                                                   });
                                                                                                               });
                                                                                                            });

                                                                                                                
                                                                                        
                                                                                                                    
                                                                                                                        
                                                                                        
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });

                                                                            });

                                                                        }).catch(error => {
                                                                            console.log(error);

                                                                        })


                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });


                                                });
                                            });

                                            
                                        });
                                        

                                    }).catch(err => {
                                        console.log(err);
                                    });



                                }).catch( err => {
                                    console.log(err);
                                    assert(1==2, "Erreur impossible de localiser l'utilisateur");
                                });
                            });


                        });
                    
                    
                        

                    });      
                
                
                
                })
                
            }).catch( err => {
                console.log(err);
                assert(1==2, "Erreur impossible de se connecter avec l'utilisateur admin admin");
                driver.close();
            });

}

async function testAjoutPatient() {
    let driver = await new Builder().forBrowser("chrome").build();
    await connectUser(driver);
    console.log("promise resolved 2");
    let btnAjoutPatient = await driver.findElement(By.id('idAjoutPatient'));
    await btnAjoutPatient.click();

    let btnNewPatientCreer1 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateNotCreatable(btnNewPatientCreer1);
    let inpFullName = await driver.findElement(By.id('inpNewPatientFullName'));

    let seleniumPatientName = "Selenium-Test-Name-Patient-" + crypto.randomBytes(16).toString("hex");
    await inpFullName.sendKeys(seleniumPatientName);

    let btnNewPatientCreer2 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateNotCreatable(btnNewPatientCreer2);

    let inpEmail = await driver.findElement(By.id('inpNewPatientEmail'));

    await inpEmail.sendKeys(crypto.randomBytes(16).toString("hex") + "@Selenium-Test-Email.com");

    let btnNewPatientCreer3 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateCreatable(btnNewPatientCreer3);
    await validatePatientIsAccessable(driver, seleniumPatientName);
}

async function validatePatientIsAccessable(driver, name) {
    return new Promise(async (resolve, reject) => {
        driver.findElement(By.xpath('//*[@id=\"autocomplete\"]//input')).then((search) => {
            search.clear().then(() => {
                search.sendKeys(name).then(() => {
                    driver.wait(until.elementLocated(By.xpath("//*[@id=\"autocomplete\"]/div[1]/div[2]/ul/li[1]/div/a")), 5000).then((searchResult) => {
                        
                        searchResult.click().then(() => {
                            resolve("Patient est accessible");
                        }).catch(err => {
                            reject(new Error(err));
                        });
                    }).catch(err => {
                        assert(1==2, "Erreur impossible de localiser l'utilisateur apres l'ajout du nouveau patient");
                        reject(new Error(err));
                        
                    });
                });

            });

        });
    });
        
       
           

}

async function testAjoutPatientValidateNotCreatable(btnNewPatientCreer) {
    return new Promise(async (resolve, reject) => {
        btnNewPatientCreer.click().then(() => {
            assert(1==2, "Ajout patient, tous les champs obligatoire doivent être entré pour la création d'un nouveau patient");

            reject(new Error("Ajout patient, tous les champs obligatoire doivent être entré pour la création d'un nouveau patient"));

        }).catch((err) => {
            assert(err.name =="ElementNotInteractableError", "Le bouton de création de patient doit être désactivé");

            if(err.name != "ElementNotInteractableError") {
                reject(new Error(err));
            } else {
                resolve("Patient non creatable");
            }
        });
    });
}

async function testAjoutPatientValidateCreatable(btnNewPatientCreer) {
    return new Promise(async (resolve, reject) => {
        btnNewPatientCreer.click().then(() => {
                       
            resolve("Patient creatable");

        }).catch((err) => {
            
            assert(1==2, "Ajout patient, impossible d'ajouter un patient");           
            reject(new Error(err));
            
        });
    });
}

async function connectUser(driver) {   

    return new Promise(async (resolve, reject) => {
      
    driver.get(siteUrl);
    let username = await driver.findElement(By.name("email"));
    let password = await driver.findElement(By.name("hash"));

    await username.sendKeys("admin");
    await password.sendKeys("admin");

    await driver.findElement(By.name("btnConnexion")).click();

    driver.wait( until.elementLocated(By.id('idAjoutPatient')),
       5000).then(() => {
        console.log("promised resolved 1");
        resolve("Hello");
    }).catch(err => {
        reject(new Error(err));
    });
});

    
  

  
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

testBadLogin();
testLogin();
testArchive();
testAjoutPatient();
