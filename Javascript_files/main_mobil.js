"use strict";

 // Alles in MOBIL-FIRST Konvertieren // 
 // Am besten mit nur 2 Breakpoints - für Mobil + Laptop Desktop //
 // Breakpoint bei so 450px width setzten //

 /* Akutelle Ideen:
   -> Index überarbeiten
   -> Questions in Localstorage ablegen 

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

// NEUE FEATURES //
/*   

    - In Dropwdown Menü von Profilbild,
      einbauen, das Switch erst mit weiterem klicken,
      einer neuen "Switch" Funktion in ausgeklappter leiste geht.
      So wie in YT ist, nicht direkt per klick in Leiste
      sondern extra verpacken.

    - Per input_type: "file" möglich machen, das man sein Profilbild hochlädt
      aber wie nach file upload die Datei weiter verarbeiten?

    ---- INDEX_TEIL ----

    - Anstatt die Ul_Leiste oben stehen zu haben,
      für Auswahl 4+ Kästchen einbauen, mit verschiedenen Bereichen.
      das Kästchen mit grey filter versehen und erst bei drüber hovern,
      wird der Filter auf 0 gesetzt + das Video im Kästchen startet dann erst.
      Auch wird der Inhalt dann per degree etwas "gedreht" und das Kästchen etwas größer.

    ---- QUIZ_TEIL ----

    - Fragen & Antworten noch im Localstorage hinterlegen.

    ---- FORUM_TEIL ----

    - Noch völlig überarbeiten für die Mobilversion,
      gerade das erstellen von Text_box muss an die kleine Version
      angepasst werden.

    - Bankmenü und Textbox_menü noch anpassen,
       buggt ab 4ten Eintrag, danach zu verschoben.
       // LÖSUNG?
       Mögliche Lösung: Klassen vergeben und mit vorgefertigtem CSS weiter arbeiten.
       So wie mit Quiz gelöst? Das nur auf dem angeklicktem die Klasse erstellt wird,
       auf dem es sichtbar wird, der Rest mit der anderen Klasse wird blurry?

    !--> Grundsätzlich alles gescheit auf Mobilversion anpassen <--!

*/

/* Die ganzen Selektoren */ 
let passwort_new = document.querySelector("#passwort");
let user_data = [];
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

/* Der Knopf um wiederum Inhalt aus dem unteren Teil von Forum zu löschen,  
   mit Prüfung von Zahl, ob eben User eingeloggt ist + ob überhaupt Inhalt drinnen ist */



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

// Blurry Effekt für die Menü_leiste Buttons //

let Menu_Leiste_buttons = document.querySelectorAll('.bg_top button');
Menu_Leiste_buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        Menu_Leiste_buttons.forEach(btn => {
            if (btn !== button) {
                btn.style.filter = 'blur(3px)';
            }
        });
    });

    button.addEventListener('mouseleave', () => {
        Menu_Leiste_buttons.forEach(btn => {
            btn.style.filter = 'none';
        });
    });
});


// Mittels der neuen JS-Abfrage das ganze so umändern, das nur bei dieser kleinen Breite das click Event wirkt
if(display_knopf !== null) {
display_knopf.addEventListener('click', () => {
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

        if(bg_switcher !== null){
            bg_switcher.addEventListener('mouseleave', () => {
                if(stufe === 1) {
                    bg_switcher.style.backgroundColor = "#FFF";
                    bg_switcher.style.color = "#000";
                } else if(stufe === 0){
                    bg_switcher.style.backgroundColor = "#000";
                    bg_switcher.style.color = "#FFF";
                }});
        };
 
        // Die Funktion des Switchers //
        if(bg_switcher !== null){
            bg_switcher.addEventListener('click', () => {
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
        };


// Profil_ausklapp_Box //

let ausklapp_box = document.querySelector('.ausklap_menu');
let profil_box = document.querySelector('.profil_ul');
let switch_left = document.querySelector('.switchButton_left');
let switch_right = document.querySelector('.switchButton_right');
let auslog_knopf = document.querySelector('.logout');
let ausklapp_sichtbar = 0;

// Falls User ausgloggt auf die Page geht //
if(profil_box !== null){
    if(localStorage.getItem("zahl") == null){
        profil_box.style.backgroundColor = 'rgb(229, 255, 0)';
        profil_box.innerHTML = "X";
        profil_box.style.color = '#FFF';
    };
};

if(profil_box !== null){
    profil_box.addEventListener('click', () => {
        // Abfrage bevor die Box augeklappt wird, ob User eingeloggt ist //
        if(ausklapp_sichtbar === 0) {
        if(localStorage.getItem("zahl") !== null){
            ausklapp_sichtbar = 1;
            ausklapp_box.classList.add('profil_sichtbar');
            ausklapp_box.classList.remove('profil_unsichtbar');
            switch_left.classList.add('switch_left_sichtbar');
            switch_left.classList.remove('switch_left_unsichtbar');
            switch_right.classList.add('switch_right_sichtbar');
            switch_right.classList.remove('switch_right_unsichtbar');
        } else {
            alert('Du bist nicht eingeloggt!');
        }
    } else{
        ausklapp_sichtbar = 0;
        ausklapp_box.classList.add('profil_unsichtbar');
        ausklapp_box.classList.remove('profil_sichtbar');
        switch_left.classList.add('switch_left_unsichtbar');
        switch_left.classList.remove('switch_left_sichtbar');
        switch_right.classList.add('switch_right_unsichtbar');
        switch_right.classList.remove('switch_right_sichtbar');
    };
});
};

// Switcher für PB Bild
if(switch_left !== null){
    switch_left.addEventListener('click', () => {
        if(user < 4){
            user++;
        };
        switch(user) {
            case 0:
                profil_box.style.backgroundColor = 'rgb(229, 255, 0)';
                ausgabe_knopf.style.backgroundColor = 'rgb(229, 255, 0)';
                ausgabe_knopf.style.color = '#000';
                break;
            case 1:
                profil_box.style.backgroundColor = 'rgb(0, 0, 253)';
                ausgabe_knopf.style.backgroundColor = 'rgb(0, 0, 253)';
                ausgabe_knopf.style.color = '#FFF';
                break;
            case 2:
                profil_box.style.backgroundColor = 'rgb(122, 4, 4)';
                ausgabe_knopf.style.backgroundColor = 'rgb(122, 4, 4)';
                ausgabe_knopf.style.color = '#FFF';
                break;
            case 3:
                profil_box.style.backgroundColor = 'rgb(60, 255, 0)';
                ausgabe_knopf.style.backgroundColor = 'rgb(60, 255, 0)';
                ausgabe_knopf.style.color = '#000';
                break;
            case 4:
                profil_box.style.backgroundColor = 'rgb(241, 0, 189)';
                ausgabe_knopf.style.backgroundColor = 'rgb(241, 0, 189)';
                ausgabe_knopf.style.color = '#FFF';
                break;
        };
    });
};

// Das ganze Event wiederhollt aber auf der rechten Seite
if(switch_right !== null){
    switch_right.addEventListener('click', () => {
        if(user > 0){
            user--;
        };
        switch(user) {
            case 0:
                profil_box.style.backgroundColor = 'rgb(229, 255, 0)';
                ausgabe_knopf.style.backgroundColor = 'rgb(229, 255, 0)';
                ausgabe_knopf.style.color = '#000';
                break;
            case 1:
                profil_box.style.backgroundColor = 'rgb(0, 0, 253)';
                ausgabe_knopf.style.backgroundColor = 'rgb(0, 0, 253)';
                ausgabe_knopf.style.color = '#FFF';
                break;
            case 2:
                profil_box.style.backgroundColor = 'rgb(122, 4, 4)';
                ausgabe_knopf.style.backgroundColor = 'rgb(122, 4, 4)';
                ausgabe_knopf.style.color = '#FFF';
                break;
            case 3:
                profil_box.style.backgroundColor = 'rgb(60, 255, 0)';
                ausgabe_knopf.style.backgroundColor = 'rgb(60, 255, 0)';
                ausgabe_knopf.style.color = '#000';
                break;
            case 4:
                profil_box.style.backgroundColor = 'rgb(241, 0, 189)';
                ausgabe_knopf.style.backgroundColor = 'rgb(241, 0, 189)';
                break;
        };
    });
};


// Auslog_Knopf //
if(auslog_knopf !== null){
    auslog_knopf.addEventListener('click',() => {
        profil_box.style.backgroundColor = '#000';
        profil_box.innerHTML = "X";
        profil_box.style.color = '#FFF';
        alert("Erfolgreich ausgeloggt!");
        localStorage.removeItem('zahl');
        ausklapp_sichtbar = 0;
        ausklapp_box.classList.add('profil_unsichtbar');
        ausklapp_box.classList.remove('profil_sichtbar');
        switch_left.classList.add('switch_left_unsichtbar');
        switch_left.classList.remove('switch_left_sichtbar');
        switch_right.classList.add('switch_right_unsichtbar');
        switch_right.classList.remove('switch_right_sichtbar');
    });
};











