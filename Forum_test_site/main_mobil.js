"use strict";

 // Alles in MOBIL-FIRST Konvertieren // 
 // Am besten mit nur 2 Breakpoints - für Mobil + Laptop Desktop //
 // Breakpoint bei so 450px width setzten //

// BEKANNTE BUGS //
/*  
    - Textcolor Generator, der sich an BG_color anpasst 

    - Bei Mobilversion in Createpage noch die Elemente anpassen.
      Problem ist Display von Menu-leiste bei wieder in Desktop umwandlung,
      nach dem bereits der Display_button gedrückt wurde.

    - Light -> Darkmode Funktion
      Switch_Button noch fixxen, sobald Stufe auf 0 gesetzt wurde,
      bleibt die BG_color auf #000 stehen, Hover_Effekt greift dann nicht mehr.
      Auf 0 sollte es auch stehen bleiben aber Hover_Effekt noch greifen.
      -- Erst später / am Ende fixxen --

    - Eingeloggt_Box muss auf Forumseite weniger margin_top haben,
      ansonsten zu weit unten am Rand. Betrifft ganze Box.

// NEUE FEATURES //
/*  
    - Das ganze in Github zuhause pushen    

    - Neben der Box vom posting in Forum, Profilbild irgendwie "anhängen"
      Auch bei Light / Shadow_mode das demenentsprechend der Rand und Text von Post verändert wird,
      Von #FFF wieder zu #000 und umgekehrt.
      ---> Sprich man müsste User als solches wieder per Localstore speichern,
           dass das PB Bild direkt auf die anderen Seiten übernommen wird.
        Aber erst später einbauen, noch zu komplex, den jedes mal einen Localstorage Wert pro Klick
        zu überschreiben bringt es nicht.

    - Drag and Drop Funktion testen

    - BONUS: Daten in MySql Datenbank hinterlegen, anstatt nur im localstore

    - Eingelogt_box irgendwie auf Mobileversion anpassen,
      grundsätzlich alle Elemente mal in Mobilversion umsortieren,
      zu viele Features auf zu wenig Platz, alles in Display Button einfügen?

    ---- FORUM_TEIL ----

    - Löschbutton komplett entfernen, stadessen soll bei Klick auf Forumeintrag
      der Eintrag blurry werden und sich ein Dropdown Menü mit der Lösch Funktion öffnen,
      so wie in dem Bankenbeispiel gelernt. Also soll nur noch Post_Button existieren.
      Das ganze per Funktion schreiben, bevor für jedes neue Div extra schreiben.
      Aber anstatt Drop-down Menü nur eine kleine Box, mit 2 Optionen:
         - Einmal löschen
         - Dann noch bearbeiten, sobald bearbeiten abgesendet wurde,
           soll der Inhalt vom Forumeintrag auf den Value vom geänderten Text geswicht werden,
           das Ganze könnte per target.style. angesprochen werden, das ich keine extra Klassen
           für jedes Div anfertigen müsste.
           <--!! ALS NÄCHSTES DIESES KLICK EVENT ANGEHEN
           BUGGT NOCH!!-->

    - Eingeloggt_box völlig entfernen, stadtessen wie in YT / Google das 
      jeweilige Profilbild in Nav_Leiste rechts oben hinterlegen,
      bei Klick auf das Bild dann Dropdown-menü mit Ausloggfunktion
      und eben der Swticher_Funktion anzeigen lassen.

    - Nach neuem Eingeloggt_Box Aufbau, ebenfalls ein Default einbauen,
      der statt einem Profilbild angezeigt wird, sobald User nicht eingeloggt währe.
      Sowas wie X oder /X/ als einfaches Testbild.
*/

/* Die ganzen Selektoren */ 
let username_new = document.querySelector("#name");
let passwort_new = document.querySelector("#passwort");
let passwort_login = document.querySelector("#passwort_login");
let knopf_new = document.querySelector("#erstellen");
let knopf_login = document.querySelector("#login");
let user_data = [];
let container_sammler = document.querySelector(".container_sammler");
let ausgabe_knopf = document.querySelector(".forum_knopf");
let delete_knopf = document.querySelector(".forum_delete");
let pw_generator = document.querySelector("#generator");
// BG_Switcher -> Light oder Darkmode //
let bg_switcher = document.querySelector(".bg_switcher");
let h3_schrift = document.querySelector(".h3_oben");
let html_bg = document.querySelector(".bg");
let name_label = document.querySelector(".name_label");
let pw_creativesite_label = document.querySelector(".pw_label");
// Responsive Selektoren //
let display_knopf = document.querySelector("#display_knopf");
let Menu_Leiste = document.querySelector(".bg_top ul");
let main_create_formular = document.querySelector("#create");
let nav_bar = document.querySelector(".bg_top");
// USER in Eingelogtbox //
let user = 0;

// Das Userobject erstellen //
if(knopf_new !== null) {
    knopf_new.addEventListener("click", () => {
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
pw_generator.addEventListener("click", () => {
    pw_generieren(3);
})};


// Logindaten gegen prüfen + die Box erstellen die anzeigt, das der User eingelogt ist //
if(knopf_login !== null) {
knopf_login.addEventListener("click", () => {
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

// Hier wird die zahl in den localstorage gespusht, sollte der Login erfolgreich sein //
    if(berechtigung) {
        if(localStorage.getItem("zahl") === null) {
        alert("Erfolgreich eingeloggt!");
        const zahl = JSON.parse(localStorage.getItem("zahl")) || [];
        zahl.push("zahl");
        localStorage.setItem("zahl", JSON.stringify(zahl));
        // Die eingelogt Box an sich erstellen //
        let eingelogt = document.createElement("div");
        eingelogt.classList.add("eingelogt");
        eingelogt.style.width = "200px";
        eingelogt.style.height = "125px";
        eingelogt.style.border = "1px solid #FFF";
        eingelogt.style.backgroundColor = "#000";
        eingelogt.style.marginLeft = "40px";
        eingelogt.style.marginTop = "100px";
        let p = document.createElement("p");
        p.innerText = "Du bist eingelogt!";
        p.style.textAlign = "center";
        p.style.color = "#FFF";
        p.style.marginBottom = "0px";
        p.style.textTransform = "uppercase";
        p.style.textShadow = "0px 0px 1px red"

        // --- Das Profilbild -> NOCH IM TEST --- //
       // Switch_Knopf auf der linken Seite für eigentliche Profilbild noch vor dem richtigen Profilbild //
        let switchButton_left = document.createElement("button");
        switchButton_left.classList.add("switchKnopf");
        switchButton_left.style.width = "20px";
        switchButton_left.style.height = "20px";
        switchButton_left.style.marginLeft = "10px";
        switchButton_left.style.backgroundColor = "orange";
        switchButton_left.style.innerText = "Plus";
        switchButton_left.addEventListener("mouseenter", () => {
        switchButton_left.style.cursor = 'pointer';
        });
        // Switch_Knopf auf der rechten Seite
        let switchButton_right = document.createElement("button");
        switchButton_right.classList.add("switchKnopf");
        switchButton_right.style.width = "20px";
        switchButton_right.style.height = "20px";
        switchButton_right.style.marginLeft = "10px";
        switchButton_right.style.backgroundColor = "yellow";
        switchButton_right.style.innerText = "Plus";
        switchButton_right.addEventListener("mouseenter", () => {
        switchButton_right.style.cursor = 'pointer';
        });

    // Grundsätzlich die Funktion testen //
     // Switch_Event als solches funktioniert! -> Muss nur noch auf das Bild übertragen werden //
    switchButton_left.addEventListener("click", () => {
        console.log(user);
        if(user < 4){
            user++;
        };
        switch(user) {
            case 1:
                picture.style.backgroundColor = "blue";
                break;
            case 2:
                picture.style.backgroundColor = "red";
                break;
            case 3:
                picture.style.backgroundColor = "green";
                break;
            case 4:
                picture.style.backgroundColor = "white";
                break;
        };
    });
    // Das ganze Event wiederhollt aber auf der rechten Seite
    switchButton_right.addEventListener("click", () => {
        console.log(user);
        if(user > 0){
            user--;
        };
        switch(user) {
            case 1:
                picture.style.backgroundColor = "blue";
                break;
            case 2:
                picture.style.backgroundColor = "red";
                break;
            case 3:
                picture.style.backgroundColor = "green";
                break;
            case 4:
                picture.style.backgroundColor = "white";
                break;
        };
    });

         // Das eigentliche Profilbild //
        let picture = document.createElement("div");
        picture.classList.add('profilPicture');
        picture.style.width = "52px";
        picture.style.height = "33px";
        picture.style.backgroundColor = "orange";
        picture.style.marginLeft = "40px";
        picture.style.marginTop = "5px";
        picture.style.display = "inline-block";

        // Die auslog Funktion //
        let auslog_knopf = document.createElement("button");
        auslog_knopf.innerText = "ausloggen!";
        auslog_knopf.style.marginLeft = "50px";
        auslog_knopf.style.marginTop = "10px";
        auslog_knopf.style.height = "28px";
        auslog_knopf.style.width = "90px";
        auslog_knopf.style.backgroundColor = "red";
        auslog_knopf.style.color = "#FFF";
        auslog_knopf.classList.add("auslog_knopf_css");
        auslog_knopf.addEventListener("mouseenter",() => {
            auslog_knopf.style.cursor = "pointer";
            auslog_knopf.style.textTransform = "uppercase";
            auslog_knopf.style.width = "110px";
            auslog_knopf.style.backgroundColor = "orange";
            auslog_knopf.style.color = "#000";
        });
        auslog_knopf.addEventListener("mouseleave", () => {
            auslog_knopf.style.textTransform = "lowercase";
            auslog_knopf.style.width = "90px";
            auslog_knopf.style.backgroundColor = "red";
            auslog_knopf.style.color = "#FFF";
        });
        auslog_knopf.addEventListener("click", () => {
            localStorage.removeItem("zahl");
            let letzte_login = document.body.lastChild;
            document.body.removeChild(letzte_login);
        });
        eingelogt.appendChild(p);
        // Das Testbild -> Läuft soweit //
        eingelogt.appendChild(switchButton_left);
        eingelogt.appendChild(switchButton_right);
        eingelogt.appendChild(picture);
        // Testbild Ende //
        eingelogt.appendChild(auslog_knopf);
        document.body.appendChild(eingelogt);
    } else {alert("Du bist bereits eingeloggt!")};
    } else {
        alert("Falsche Logindaten!");
    };
});
}

// Die Einlog_Box auch auf den anderen Seite anzeigen //

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("zahl") !== null) {
        let eingelogt = document.createElement("div");
        eingelogt.style.width = "200px";
        eingelogt.style.height = "125px";
        eingelogt.style.border = "1px solid #FFF";
        eingelogt.style.backgroundColor = "#000";
        eingelogt.style.marginLeft = "40px";
        eingelogt.style.marginTop = "100px";
        let p = document.createElement("p");
        p.innerText = "Du bist eingelogt!";
        p.style.textAlign = "center";
        p.style.color = "#FFF";
        p.style.marginBottom = "0px";
        p.style.textTransform = "uppercase";
        p.style.textShadow = "0px 0px 1px red"
        // Die auslog Funktion //
        let auslog_knopf = document.createElement("button");
        auslog_knopf.innerText = "ausloggen!";
        auslog_knopf.style.marginLeft = "50px";
        auslog_knopf.style.marginTop = "10px";
        auslog_knopf.style.height = "28px";
        auslog_knopf.style.width = "90px";
        auslog_knopf.style.backgroundColor = "red";
        auslog_knopf.style.color = "#FFF";
        auslog_knopf.classList.add("auslog_knopf_css");
        auslog_knopf.addEventListener("mouseenter",() => {
            auslog_knopf.style.cursor = "pointer";
            auslog_knopf.style.textTransform = "uppercase";
            auslog_knopf.style.width = "110px";
            auslog_knopf.style.backgroundColor = "orange";
            auslog_knopf.style.color = "#000";
        });
        auslog_knopf.addEventListener("mouseleave", () => {
            auslog_knopf.style.textTransform = "lowercase";
            auslog_knopf.style.width = "90px";
            auslog_knopf.style.backgroundColor = "red";
            auslog_knopf.style.color = "#FFF";
        });
        auslog_knopf.addEventListener("click", () => {
            localStorage.removeItem("zahl");
            let letzte_login = document.body.lastChild;
            document.body.removeChild(letzte_login);
        });
        // Das mit dem Profilbild und dem Switcher daneben
        let switchButton_left = document.createElement("button");
        switchButton_left.classList.add("switchKnopf");
        switchButton_left.style.width = "20px";
        switchButton_left.style.height = "20px";
        switchButton_left.style.marginLeft = "10px";
        switchButton_left.style.backgroundColor = "orange";
        switchButton_left.textContent = "+";
        switchButton_left.addEventListener("mouseenter", () => {
        switchButton_left.style.cursor = 'pointer';
        });
        // Switch_Knopf auf der rechten Seite
        let switchButton_right = document.createElement("button");
        switchButton_right.classList.add("switchKnopf");
        switchButton_right.style.width = "20px";
        switchButton_right.style.height = "20px";
        switchButton_right.style.marginLeft = "10px";
        switchButton_right.style.backgroundColor = "yellow";
        switchButton_right.textContent = "-";
        switchButton_right.addEventListener("mouseenter", () => {
        switchButton_right.style.cursor = 'pointer';
        });
        // Switcher für PB Bild
        switchButton_left.addEventListener("click", () => {
            if(user < 4){
                user++;
            };
            switch(user) {
                case 0:
                    picture.style.backgroundColor = 'rgb(229, 255, 0)';
                    break;
                case 1:
                    picture.style.backgroundColor = 'rgb(0, 0, 253)';
                    break;
                case 2:
                    picture.style.backgroundColor = 'rgb(122, 4, 4)';
                    break;
                case 3:
                    picture.style.backgroundColor = 'rgb(60, 255, 0)';
                    break;
                case 4:
                    picture.style.backgroundColor = 'rgb(241, 0, 189)';
                    break;
            };
        });
        // Das ganze Event wiederhollt aber auf der rechten Seite
        switchButton_right.addEventListener("click", () => {
            console.log(user);
            if(user > 0){
                user--;
            };
            switch(user) {
                case 0:
                    picture.style.backgroundColor = 'rgb(229, 255, 0)';
                    break;
                case 1:
                    picture.style.backgroundColor = 'rgb(0, 0, 253)';
                    break;
                case 2:
                    picture.style.backgroundColor = 'rgb(122, 4, 4)';
                    break;
                case 3:
                    picture.style.backgroundColor = 'rgb(60, 255, 0)';
                    break;
                case 4:
                    picture.style.backgroundColor = 'rgb(241, 0, 189)';
                    break;
            };
        });
             // Das eigentliche Profilbild //
            let picture = document.createElement("div");
            picture.classList.add('profilPicture');
            picture.style.width = "52px";
            picture.style.height = "33px";
            picture.style.backgroundColor = "yellow";
            picture.style.marginLeft = "40px";
            picture.style.marginTop = "5px";
            picture.style.display = "inline-block";

        // Alles in die Box einfügen
        eingelogt.appendChild(p);
        eingelogt.appendChild(switchButton_left);
        eingelogt.appendChild(switchButton_right);
        eingelogt.appendChild(picture);
        eingelogt.appendChild(auslog_knopf);
        document.body.appendChild(eingelogt);
    };
});

// TESTFORUM //
 /* Eintrag nach Prüfung von Zahl in localstore (Was erst nach dem erfolgreichen Login existiert)
    in unteren Teil pushen */
    // Push_Wert auf 0 setzten, damit bei jedem 2ten Eintrag, Text verschoben wird //
    let links_schieben = 0;
    let blur_box_counter = 0;
if(ausgabe_knopf !== null) {
    ausgabe_knopf.addEventListener("click", () => {
        if(localStorage.getItem("zahl") !== null) {
        let textwert = document.querySelector(".forum_text").value;
        let div = document.createElement("div");
        div.className = "div";
        // Muss nochmal umgeschrieben werden, sobald user in Localstorage abgespeichert wird

        // ---> DIE FUNKTIONEN FÜR NEU ERSTELLE FORUM EINTRÄGE <--- //
        // Funktionen für das Mouseenter / leave Event wegen der BG_color  //
        function mausrein(event,color){
            event.target.style.transition = 'background-color 0.5s';
            event.target.style.backgroundColor = color;
            event.target.style.fontWeight = 'bold';
            event.target.style.cursor = "pointer";
        };

        function mausraus(event,color){
            event.target.style.transition = 'background-color 0.5s';
            event.target.style.backgroundColor = color;
            event.target.style.fontWeight = 'normal';
        };

        let blur = 0;
        let schub = 0;
        /* Problem ist, die neue Box die drüber liegt, wird nicht
           genau über dem drunterstehenden Element positiuniert */
        function klicken(event){
            let element_aktuell = event.target;
            let eltern_element_left = element_aktuell.offsetLeft;
            let eltern_element_top = element_aktuell.offsetTop;
            let bankmenu_vorhanden = document.querySelector('.bank_menu');
            if(blur === 0 && !bankmenu_vorhanden){
                element_aktuell.style.filter = 'blur(1.5px)';
                blur++;
                    let bank_menu = document.createElement("div");
                    bank_menu.classList.add('bank_menu');
                    bank_menu.id = element_aktuell.id;
                    bank_menu.style.width = "50px";
                    bank_menu.style.height = "45px";
                    bank_menu.style.backgroundColor = "#000";
                    bank_menu.style.color = "#FFF";
                    bank_menu.innerText = "Testspruch";
                    bank_menu.style.position = "absolute";
                    bank_menu.style.zIndex = "2";
                    bank_menu.style.filter = 'none';
                                    // Switch_Event, je nach dem wie der Eintrag geschoben wurde, das immer zentriert //
                let schub = 0;
                // Position_erfassen //
                if(schub === 0){
                    // Funktioniert solange nur 3 Einträge vorhanden sind aber buggt sobald >3 //
                    bank_menu.style.marginLeft =  `${eltern_element_left - 280}px`;
                    bank_menu.style.marginTop = `${eltern_element_top - 450}px`;
                    schub++;
                }else {
                    /* Muss noch angepasst werden, sobald eben Eintrag nach links verschoben wurde.
                       Und das Neue_Box direkt auf dem unteren Element positioniert wird, anstatt 
                       immer nur auf dem unteresten erstellt zu werden (TargetX und Y erfassen dazu), 
                       auch das nicht x Boxen erstellt werden könnnen, 
                       sondern beim klick auf neuem Eintrag automatisch die letzte bank_menu Box deleted wird */
                };
                // Buggt noch, sobald ein bank_menu existiert und mann wieder auf das untere Element klicken will, hängt es sich auf // 
                    container_sammler.appendChild(bank_menu);
            } else if(element_aktuell.id === bank_menu.id){
                element_aktuell.style.filter = 'none';
                blur--;
                    let letzte = container_sammler.lastChild;
                    container_sammler.removeChild(letzte);
            };
        };
        // Dropdown_Menü samt dem Blurry_Effekt noch einbauen //

        switch(user){
            // Case xy change_Farbe = rgb(2, 2, 197) //
            case 0:
                div.style.border = '1px solid #000';
                div.style.backgroundColor = 'rgb(145, 160, 12)';
                div.style.color = '#000';
                div.style.fontWeight = 'normal';
                div.style.position = 'relative';
                div.style.zIndex = '1';
                div.addEventListener('mouseenter', (event) => {
                    mausrein(event, 'rgb(229, 255, 0)');
                });
                div.addEventListener('mouseleave', (event) => {
                    mausraus(event,'rgb(145, 160, 12)');
                });
                div.addEventListener('click', (event) => {
                    klicken(event);
                });
                break;
            case 1:
                div.style.border = '1px solid #000';
                div.style.backgroundColor = 'rgb(0, 0, 65)';
                div.style.color = '#FFF';
                div.style.fontWeight = 'normal';
                div.addEventListener('mouseenter', (event) => {
                    mausrein(event, 'rgb(0, 0, 253)');
                });
                div.addEventListener('mouseleave', (event) => {
                    mausraus(event,'rgb(0, 0, 65)');
                });
                div.addEventListener('click', (event) => {
                    klicken(event);
                });
                break;
            case 2:
                div.style.border = '1px solid #000'; 
                div.style.backgroundColor = 'rgb(122, 4, 4)';
                div.style.color = '#FFF';
                div.addEventListener('mouseenter', (event) => {
                    mausrein(event, 'rgb(255, 0, 0)');
                });
                div.addEventListener('mouseleave', (event) => {
                    mausraus(event,'rgb(122, 4, 4)');
                });
                div.addEventListener('click', (event) => {
                    klicken(event);
                });
                break;
            case 3:
                div.style.border = '1px solid #000'; 
                div.style.backgroundColor = 'rgb(29, 124, 0)';
                div.style.color = '#FFF';
                div.addEventListener('mouseenter', (event) => {
                    mausrein(event, 'rgb(60, 255, 0)');
                });
                div.addEventListener('mouseleave', (event) => {
                    mausraus(event,'rgb(29, 124, 0)');
                });
                div.addEventListener('click', (event) => {
                    klicken(event);
                });
                break;   
            case 4:
                div.style.border = '1px solid #000'; 
                div.style.backgroundColor = 'rgb(122, 4, 96)';
                div.style.color = '#FFF';
                div.addEventListener('mouseenter', (event) => {
                    mausrein(event, 'rgb(241, 0, 189)');
                });
                div.addEventListener('mouseleave', (event) => {
                    mausraus(event,'rgb(122, 4, 96)');
                });
                div.addEventListener('click', (event) => {
                    klicken(event);
                });
                break;
        }
        // --- // 
        div.style.width = "340px";
        div.style.padding = "3px";
        div.style.marginTop = "10px";
        if(links_schieben === 0){
            div.style.marginLeft = "80px";
            links_schieben = 1;
        } else {
            div.style.marginLeft = "0px";
            links_schieben = 0;
        };
        // Hier das Profilbild zuerst abfragen
        // div.style.backgroundColor = randomfarbe;
        div.innerHTML = textwert;
        blur_box_counter++;
        div.id = `blur_box_counter_id>${blur_box_counter}`;
        container_sammler.appendChild(div);
    }else {alert("Keine Zugriffsrechte!")} 
})};

/* Der Knopf um wiederum Inhalt aus dem unteren Teil von Forum zu löschen,  
   mit Prüfung von Zahl, ob eben User eingeloggt ist + ob überhaupt Inhalt drinnen ist */

if(delete_knopf !== null) {
delete_knopf.addEventListener("click", () => {
    if(localStorage.getItem("zahl") !== null) {
    if(container_sammler.children.length > 0){
        let letzte = container_sammler.lastChild;
        container_sammler.removeChild(letzte);
    } else {alert("Es ist nicht mal was eingetragen!")};
}else{alert("Keine Zugriffsrechte!")}
})};

// Responsive Test mit dem Burger-Menu //
let anzeige_modus = 0;

// Responsive Abfrage der Nav_Leiste machen -> Bisher nur auf create Seite angepasst // 

// function andereBreite () {
//     if(window.innerWidth > 600) {
//         Menu_Leiste.style.display = "flex";
//         console.log("Klappt!");
//     } else {
//         Menu_Leiste.style.display = "none";
//     }
// }


// if(document.title == "create_mobil") {
    
//     window.addEventListener('resize',andereBreite);
//     andereBreite();
// };  <--- BUGGT --->


// Mittels der neuen JS-Abfrage das ganze so umändern, das nur bei dieser kleinen Breite das click Event wirkt
if(display_knopf !== null) {
display_knopf.addEventListener("click", () => {
    if(anzeige_modus === 0) {
        anzeige_modus = 1;
        Menu_Leiste.style.display = "block";
        Menu_Leiste.style.marginLeft = "20%";
        // knopf_new.style.marginTop = "1rem" <-- Muss noch angepasst werden, zu nah an Create_Formular dran;
        display_knopf.style.top = "160px";
        nav_bar.style.height = "14rem";
        // knopf_new.style.marginTop = "35px";
    } else {
        Menu_Leiste.style.display = "none";
        display_knopf.style.top = "0px";
        if( main_create_formular !== null){
            main_create_formular.style.marginTop = "10%";
        };
        anzeige_modus = 0;
        nav_bar.style.height = "4rem";
    };
})};

//--> Dark / Lightmode -> Switcher <--//
let stufe = 1;

    if(bg_switcher !== null) {
        // Der Hover_Effekt in JS umgeschrieben //
            bg_switcher.addEventListener('mouseenter', () => {
                bg_switcher.style.cursor = 'pointer';
                if(stufe === 1) {
                bg_switcher.style.backgroundColor = "#000";
                bg_switcher.style.color = "#FFF";
                }});
        } else if(stufe === 0){
                bg_switcher.style.backgroundColor = "#FFF";
                bg_switcher.style.color = "#000";
        }

        bg_switcher.addEventListener('mouseleave', () => {
            if(stufe === 1) {
                bg_switcher.style.backgroundColor = "#FFF";
                bg_switcher.style.color = "#000";
            } else if(stufe === 0){
                bg_switcher.style.backgroundColor = "#000";
                bg_switcher.style.color = "#FFF";
            }});
 
        // Die Funktion des Switchers //
        bg_switcher.addEventListener("click", () => {
            //Die momentane Width erfassen wegen Erstellbutton //
            let breite = window.innerWidth;
            if(stufe === 0){
                html_bg.style.backgroundColor = "rgb(46, 46, 46)";
                h3_schrift.style.color = "#FFF";
                if(name_label !== null){
                    name_label.style.color = "#FFF";
                };
                if(pw_creativesite_label !== null){
                    pw_creativesite_label.style.color = "#FFF";
                } else if(passwort_login !== null) {
                    passwort_login.style.color = "#FFF";
                };
                if(knopf_new !== null){
                    knopf_new.style.color = "#FFF";
                };
                if(knopf_login !== null){
                    knopf_login.style.color = "#FFF";
                }
                stufe = 1;
            } else{
                html_bg.style.backgroundColor = "#cacaca";
                h3_schrift.style.color = "#000";
                if(name_label !== null){
                    name_label.style.color = "#000";
                };
                if(pw_creativesite_label !== null){
                    pw_creativesite_label.style.color = "#000";
                } else if(passwort_login !== null) {
                    passwort_login.style.color = "#000";
                };
                if(breite > 600){
                    if(knopf_new !== null){
                        knopf_new.style.color = "#000";
                    } else if(knopf_login !== null){
                        knopf_login.style.color = "#000";
                    }
                };
                stufe = 0
            };
        });
















