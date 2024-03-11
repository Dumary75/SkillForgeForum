"use strict";

/* Die ganzen Selektoren */ 
let knopf_login = document.querySelector("#login");
let passwort_login = document.querySelector("#passwort_login");
let username_new = document.querySelector("#name");
let pw_auge = document.querySelector(".pw_auge");

/* -- Die Funktion der Seite -- */

// Logindaten gegen prüfen //
if(knopf_login !== null) {
    knopf_login.addEventListener('click', () => {
        let name_wert = username_new.value;
        let pw_wert = passwort_login.value;
        const saved_names = JSON.parse(localStorage.getItem("saved_names")) || [];
        // Hier werden die Eingabedaten mit den im localstorage gegengeprüft //
        let berechtigung = false;
        for(let i = 0; i < saved_names.length; i++) {
            if(saved_names[i].name === name_wert && saved_names[i].password === pw_wert) {
                berechtigung = true;
                break;
            }
        };
    
    /* Hier wird die zahl in den localstorage gespusht, sollte der Login erfolgreich sein 
       Und Das Profibild von Loginbox in UL aktualisiert */
        if(berechtigung) {
            if(localStorage.getItem("zahl") === null) {
            alert("Erfolgreich eingeloggt!");
            const zahl = JSON.parse(localStorage.getItem("zahl")) || [];
            zahl.push("zahl");
            localStorage.setItem("zahl", JSON.stringify(zahl));
            let profil_box = document.querySelector('.profil_ul');
            profil_box.style.backgroundColor = 'rgb(145, 160, 12)';
            profil_box.innerHTML = "";
        }} else {
            alert("Falsche Logindaten!");
        };
    });
    }

    // Die Funktion von PW Auge, zum sichtbar / unsichtbar schalten //

    let auge_status = 0;

    if(pw_auge !== null){
        pw_auge.addEventListener('click', () => {
            if(auge_status == 0){
                auge_status = 1;
                pw_auge.style.backgroundColor = '#8d0808';
                passwort_login.type = 'text';
            } else {
                auge_status = 0;
                pw_auge.style.backgroundColor = '#08940f';
                passwort_login.type = 'password';
            }
        });
    };
