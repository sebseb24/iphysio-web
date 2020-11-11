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

                                    driver.wait(until.elementLocated(By.id('btnEditPatient')), 10000).then((ele) => {
                                        
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
    //console.log("promise resolved 2");
    let btnAjoutPatient = await driver.findElement(By.id('idAjoutPatient'));
    await btnAjoutPatient.click();

    let btnNewPatientCreer1 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateNotCreatable(btnNewPatientCreer1).catch(() => {
        assert(1==2, "testAjoutPatient, impossible de creer un patient");
        //driver.close();
    });
    let inpFullName = await driver.findElement(By.id('inpNewPatientFullName'));

    let seleniumPatientName = "Selenium-Test-Name-Patient-" + crypto.randomBytes(16).toString("hex");
    await inpFullName.sendKeys(seleniumPatientName);

    let btnNewPatientCreer2 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateNotCreatable(btnNewPatientCreer2).catch(() => {
        assert(1==2, "testAjoutPatient, Patient not supposed to be creatable");
    });

    let inpEmail = await driver.findElement(By.id('inpNewPatientEmail'));

    await inpEmail.sendKeys(crypto.randomBytes(16).toString("hex") + "@Selenium-Test-Email.com");

    let btnNewPatientCreer3 = await driver.findElement(By.id('btnNewPatientCreer'));
    await testAjoutPatientValidateCreatable(btnNewPatientCreer3).catch((err) => {
        console.log("impossible d'ajouter un nouveau patient");
        //driver.close();
    });
    await validatePatientIsAccessable(driver, seleniumPatientName).catch((err) => {
        console.log("Patient is not accessible : " + seleniumPatientName);
    });
}

async function validatePatientIsAccessable(driver, name) {
    return new Promise(async (resolve, reject) => {
        driver.findElement(By.xpath('//*[@id=\"autocomplete\"]//input')).then((search) => {
            search.clear().then(() => {
                search.sendKeys(name).then(() => {
                    driver.wait(until.elementLocated(By.xpath("//*[@id=\"autocomplete\"]/div[1]/div[2]/ul/li[1]/div/a")), 10000).then((searchResult) => {
                        
                        searchResult.click().then(() => {
                            resolve("Patient est accessible");
                        }).catch(err => {
                            reject(new Error(err));
                        });
                    }).catch(err => {
                        //assert(1==2, "Erreur impossible de localiser l'utilisateur apres l'ajout du nouveau patient");
                        reject(new Error(""));
                        
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
            //console.log("promised resolved 1");
            resolve("Hello");
        }).catch(err => {
            reject(new Error(err));
        });
    });  
}

async function testEditPatient() {

    let patientName = "Jean Tanpas";
    let driver = await new Builder().forBrowser("chrome").build();
    await connectUser(driver);    
    let btnAjoutPatient = await driver.findElement(By.id('idAjoutPatient'));
    await validatePatientIsAccessable(driver, patientName).catch(() => {
        assert(1==2, "testEditPatient, impossible d'acceder à la page du patient: " + patientName);
    });
    let btnEditPatient = await driver.findElement(By.xpath('//*[@id="btnEditPatient"]/i')).catch((err) => {
        console.log("Impossible d'acceder au bouton d'edit patient, veuillez verifier")
    });
    await btnEditPatient.click().catch((err) => {
        console.log("error cant click on btnEditPatient" + err);
    });

    let inpEditEmail = await driver.findElement(By.id('inpEditEmail')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditEmail.clear();
    await inpEditEmail.sendKeys("jean.tambien@gmail.com").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let inpEditTelephone = await driver.findElement(By.id('inpEditTelephone')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditTelephone.clear();
    await inpEditTelephone.sendKeys("+1 (444) 4444-3333").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let inpEditAdresse = await driver.findElement(By.id('inpEditAdresse')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditAdresse.clear();
    await inpEditAdresse.sendKeys("444, rue Après, Sherbrooke, QC").catch((err) => {
        console.log("Edit patient error: " + error);
    });


    let inpEditNom = await driver.findElement(By.id('inpEditNom')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditNom.clear();
    await inpEditNom.sendKeys("Joe Kekun").catch((err) => {
        console.log("Edit patient error: " + error);
    });


    let btnEditEnregistrer = await driver.findElement(By.id('btnEditEnregistrer')).catch((err) => {
        console.log("Edit patient error: " + error);
    });

    await btnEditEnregistrer.click().catch((err) => {
        console.log("Edit patient error: " + error);
    });

    

    let lblPatientName = await (await driver.findElement(By.id('lblPatientName'))).getText().catch((err) => {
        console.log("Edit patient error: " + error);
    });
    let lblPatientEmail = await (await driver.findElement(By.id('lblPatientEmail'))).getText().catch((err) => {
        console.log("Edit patient error: " + error);
    });
    let lblPatientTelephone = await (await driver.findElement(By.id('lblPatientTelephone'))).getText().catch((err) => {
        console.log("Edit patient error: " + error);
    });


    assert(lblPatientName == "Joe Kekun", "Edit Patient, Validation du nom après modification" + lblPatientName);
    assert(lblPatientEmail == "jean.tambien@gmail.com", "Edit Patient, Validation du email après modification" + lblPatientEmail);
    assert(lblPatientTelephone == "+1 (444) 4444-3333", "Edit Patient, Validation du numéro de téléphone après modification" + lblPatientTelephone);

    //await driver.get(siteUrl);
    /*await sleep(5000); // weird davoir à mettre ça
    await driver.get(siteUrl);
    await driver.navigate().refresh();
    await driver.wait( until.elementLocated(By.id('idAjoutPatient')),
        5000);*/

    await sleep(5000);
    await validatePatientIsAccessable(driver, "Joe Kekun").catch((err) => {
        assert(1==2, "Edit Patient Joe Kekun is not accessible");
    });

    btnEditPatient = await driver.findElement(By.xpath('//*[@id="btnEditPatient"]/i')).catch((err) => {
        console.log("Impossible d'acceder au bouton d'edit patient, veuillez verifier")
    });
    await btnEditPatient.click().catch((err) => {
        console.log("error cant click on btnEditPatient" + err);
    });


    // Remettre les donnée comme avant
    let inpEditEmail2 = await driver.findElement(By.id('inpEditEmail')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditEmail2.clear();
    await inpEditEmail2.sendKeys("jean.tanpas@gmail.com").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let inpEditTelephone2 = await driver.findElement(By.id('inpEditTelephone')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditTelephone2.clear();
    await inpEditTelephone2.sendKeys("111 1111 1111").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let inpEditAdresse2 = await driver.findElement(By.id('inpEditAdresse')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditAdresse2.clear();
    await inpEditAdresse2.sendKeys("111, rue de Jean Tanpas, Sherbrooke").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let inpEditNom2 = await driver.findElement(By.id('inpEditNom')).catch((err) => {
        console.log("Edit patient error: " + error);
    });
    await inpEditNom2.clear();
    await inpEditNom2.sendKeys("Jean Tanpas").catch((err) => {
        console.log("Edit patient error: " + error);
    });

    let btnEditEnregistrer2 = await driver.findElement(By.id('btnEditEnregistrer')).catch((err) => {
        console.log("Edit patient error: " + error);
    });

    await btnEditEnregistrer2.click().catch((err) => {
        console.log("Edit patient error: " + error);
    });
    driver.close();

}


async function testProgrammeExercice(patientName) {
    
    let driver = await new Builder().forBrowser("chrome").build();
    await connectUser(driver);    
    let btnAjoutPatient = await driver.findElement(By.id('idAjoutPatient'));
    await validatePatientIsAccessable(driver, patientName).catch(() => {
        assert(1==2, "testProgrammeExercice, impossible d'acceder à la page du patient: " + patientName);
    });

    let btnAddProgram = await driver.findElement(By.xpath('//*[@id="btnAddProgram"]/i')).catch((err) => {
        console.log("Impossible d'acceder au bouton d'ajout de programme, veuillez verifier")
    });

    await btnAddProgram.click().catch((err) => {
        console.log("error cant click on btnAddProgram" + err);
    });

    let mouvementBras = await driver.wait( until.elementLocated(By.xpath('//*[@id="lstBanqueExercice"]//*[contains(text(), "Mouvement bras")]')), 5000);



    await mouvementBras.click().catch((err) => {
        console.log("testProgrammeExercice, cant click sur l'exercice de la banque : " + err);
    });

    let btnSauvegarderExercice = await driver.wait( until.elementLocated(By.id("btnSauvegarderExercice")), 5000);

    await sleep(1000);

    await btnSauvegarderExercice.click().catch((err) => {
        console.log("testProgrammeExercice, cant click on add exercice : " + err);
    });

    await driver.wait( until.elementLocated(By.xpath('//*[@id="lstExercicePrg"]//*[contains(text(), "Mouvement bras")]')), 5000).catch((err) => {
        assert(1==2, "Programme exercice le mouvement bras n'a pas été ajouté à la liste d'exercice");
    });

    inpNomProgramme = await driver.wait(until.elementLocated(By.id("inpNomProgramme"))).catch((err) => {
        console.log("testProgrammeExercice, impossible de trouver le input du nom de programme : " + err);
    });

    await inpNomProgramme.sendKeys("Selenium");

    let btnPrgExerciceSauvegarder = await driver.wait(until.elementLocated(By.id('btnPrgExerciceSauvegarder')),3000).catch((err) => {
        console.log("testProgramExercice, btnPrgExerciceSauvegarder : " + err);
    });

    btnPrgExerciceSauvegarder.click().catch((err) => {
        console.log("testProgramExercice, btnPrgExerciceSauvegarder : " + err);
    });

    let prgSelenium = await driver.wait( until.elementLocated(By.xpath('//*[@id="lstProgrammeExercice"]//*[contains(text(), "Selenium")]')), 5000).catch((err) => {
        assert(1==2, "Programme exercice impossible de localiser le programme Selenium");
    });

    let delPrgSelenium = await driver.wait( until.elementLocated(By.xpath('//*[@id="lstProgrammeExercice"]//*[contains(text(), "Selenium")]/..//a')), 5000).catch((err) => {
        console.log("testProgrammeExercice : " + err);
    });

    await delPrgSelenium.click().catch((err) => {
        console.log(err);
    });

    let btnConfirm = await driver.wait( until.elementLocated(By.id('confirm-button')), 5000).catch((err) => {
        console.log("testProgrammeExercice : " + err);
    });

    await btnConfirm.click().catch((err) => {
        console.log("testProgrammeExercice : + " + err);
    });

    await sleep(1000);

    await driver.wait( until.elementLocated(By.xpath('//*[@id="lstProgrammeExercice"]//*[contains(text(), "Selenium")]')), 3000).then(() => {
        assert(1==2, "Programme exercice le programme Selenium est sensé être supprimé");
    }).catch((err) => {
        driver.close();
    });

    
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

testBadLogin();
testLogin();
testArchive();
testAjoutPatient();
//testEditPatient();
testProgrammeExercice("Germain Patoine");
