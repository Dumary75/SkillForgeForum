"use strict";

/* Die ganzen Selektoren */ 
let knopf_new = document.querySelector("#erstellen");
let username_new = document.querySelector("#name");
let pw_generator = document.querySelector("#generator");

/* -- Die Funktion der Seite -- */

// Das Userobject erstellen //
if(knopf_new !== null) {
    knopf_new.addEventListener('click', () => {
        let name_wert = username_new.value;
        let passwortd = document.querySelector("#passwort").value;
        if(passwortd !== "" && name_wert !== "") {
            let daten = {
                name: name_wert,
                password: passwortd
            };
            const saved_names = JSON.parse(localStorage.getItem("saved_names")) || [];
            saved_names.push(daten);
            localStorage.setItem("saved_names", JSON.stringify(saved_names));
            name_wert = "";
        } else {alert("Junge trag auch was ein!")};

})
};

// PW Generator unterhalb von Namen //

if(pw_generator !== null) {
function pw_generieren(length) {
    const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let passwort = "";

    for(let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        passwort += charset[randomIndex];
    }
    document.querySelector("#passwort").value = passwort;
};

// Einfachhalber werden zum Test nur 3 Zeichen verwendet //
pw_generator.addEventListener('click', () => {
    pw_generieren(3);
})};