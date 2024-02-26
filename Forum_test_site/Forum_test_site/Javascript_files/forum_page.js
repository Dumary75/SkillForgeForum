"use strict";

/* Die ganzen Selektoren */ 
let container_sammler = document.querySelector(".container_sammler");
let ausgabe_knopf = document.querySelector(".forum_knopf");
let delete_knopf = document.querySelector(".forum_delete");

/* -- Die Funktion der Seite -- */

// FORUM //
 /* Eintrag nach Prüfung von Zahl in localstore (Was erst nach dem erfolgreichen Login existiert)
    in unteren Teil pushen */
    // Push_Wert auf 0 setzten, damit bei jedem 2ten Eintrag, Text verschoben wird //
    let links_schieben = 0;
    let blur_box_counter = 0;
if(ausgabe_knopf !== null) {
    ausgabe_knopf.addEventListener('click', () => {
        if(localStorage.getItem("zahl") !== null) {
        let textwert = document.querySelector(".forum_text").value;
        let div = document.createElement("div");
        div.className = "div";

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
           genau über dem drunterstehenden Element positiuniert -> Ab 4ten Eintrag */
        function klicken(event){
            let element_aktuell = event.target;
            let eltern_element_left = element_aktuell.offsetLeft;
            let eltern_element_top = element_aktuell.offsetTop;
            let bankmenu_vorhanden = document.querySelector('.bank_menu');
            if(blur === 0 && !bankmenu_vorhanden){
                element_aktuell.style.filter = 'blur(1.5px)';
                element_aktuell.classList.add('eltern_element_div');
                blur++;
                // Die Bankmenu_Box mit lösch / bearbeiten Funktion //
                    let bank_menu = document.createElement("div");
                    bank_menu.classList.add('bank_menu');
                    bank_menu.style.width = "150px";
                    bank_menu.style.height = "110px";
                    bank_menu.style.backgroundColor = "#000";
                    bank_menu.style.color = "#FFF";
                    bank_menu.style.position = "absolute";
                    bank_menu.style.zIndex = "2";
                    bank_menu.style.filter = 'none';
                    bank_menu.id = `${element_aktuell.id}`;
                    // Schließtaste von Bank_Menu //
                    let close_bank_button = document.createElement('button');
                    close_bank_button.style.width = '77px';
                    close_bank_button.style.height = '25px';
                    close_bank_button.style.position = 'absolute';
                    close_bank_button.style.left = '30px';
                    close_bank_button.style.bottom = '7px';
                    close_bank_button.textContent = "Schließen";
                    close_bank_button.addEventListener('mouseenter',() => {
                        close_bank_button.style.cursor = 'pointer';
                    });
                    close_bank_button.addEventListener('click',() => {
                        element_aktuell.style.filter = 'none';
                        blur--;
                        element_aktuell.classList.remove('eltern_element_div');
                        container_sammler.removeChild(bank_menu);
                    });
                    // Löschtaste für Forumeintrag --> Buggt noch kompett! //
                    let delete_knopf = document.createElement('button');
                    delete_knopf.textContent = 'Löschen';
                    delete_knopf.style.width = '77px';
                    delete_knopf.style.height = '25px';
                    delete_knopf.style.position = 'absolute';
                    delete_knopf.style.left = '30px';
                    delete_knopf.style.bottom = '40px';
                    delete_knopf.style.backgroundColor = 'rgb(122, 4, 4)';
                    delete_knopf.addEventListener('mouseenter',() => {
                        delete_knopf.style.cursor = 'pointer';
                    });
                    delete_knopf.addEventListener("click", () => {
                        if(localStorage.getItem("zahl") !== null) {
                        if(container_sammler.children.length > 0){
                            container_sammler.removeChild(bank_menu);
                            let eltern_klasse = document.querySelector('.eltern_element_div');
                            container_sammler.removeChild(eltern_klasse);
                        } else {alert("Es ist nicht mal was eingetragen!")};
                    }else{alert("Keine Zugriffsrechte!")}
                    });
                    // Forum_Einträge bearbeiten Button //
                    /* Dazu wird bei Klick darauf, eine Box geöffnet,
                    um mit einem input Textfeld um den Inhalt überschreiben zu können */
                    let forum_bearbeiten_knopf = document.createElement('button');
                    forum_bearbeiten_knopf.textContent = 'Bearbeiten';
                    forum_bearbeiten_knopf.style.width = '77px';
                    forum_bearbeiten_knopf.style.height = '25px';
                    forum_bearbeiten_knopf.style.position = 'absolute';
                    forum_bearbeiten_knopf.style.left = '30px';
                    forum_bearbeiten_knopf.style.top = '10px';
                    forum_bearbeiten_knopf.addEventListener('mouseenter',() => {
                        forum_bearbeiten_knopf.style.cursor = 'pointer';;
                    });
                    // Die Bearbeitung_Funktion schreiben, samit Box erstellen //
                    let text_bearb = 0;
                    forum_bearbeiten_knopf.addEventListener('click',() => {
                        if(text_bearb === 0){
                            // Ein div kreieren, das Inputfeld in diesem samt Button zum abfeuern //
                            // BUGGT NOCH! Weil die Position davon nicht stimmt Ab 4 Einträgen //
                            let text_eingabe_box = document.createElement('div');
                            text_eingabe_box.style.position = 'relative';
                            // Sorgt dafür, dass das Eingabefeld direkt über dem Bankmenü steht
                            text_eingabe_box.style.marginLeft =  `${eltern_element_left - 280}px`;
                            text_eingabe_box.style.marginTop = `${eltern_element_top - 450}px`;

                            text_eingabe_box.style.width = '200px';
                            text_eingabe_box.style.height = '70px';
                            text_eingabe_box.style.backgroundColor = 'gray';
                            text_eingabe_box.style.border = '1px solid #000';
                            text_eingabe_box.style.zIndex = '4';
                            // Die Eingabe an sich //
                            let text_input = document.createElement('textarea');
                            text_input.style.width = '150px';
                            text_input.style.height = '30px';
                            text_input.style.marginLeft = '25px';
                            text_input.style.marginTop = '7px';
                            bank_menu.style.filter = 'blur(1.5px)';
                            // Die Knöpfe -> Schließen und ändern //
                             // Close_Button buggt, löscht den bisherigen Text drinnen //
                            let eingabebox_close_button = document.createElement('button');
                            eingabebox_close_button.textContent = "Schliesen";
                            eingabebox_close_button.addEventListener('click',() => {
                                container_sammler.removeChild(text_eingabe_box);
                                bank_menu.style.filter = 'none';
                            });
                            eingabebox_close_button.addEventListener('mouseenter',() => {
                                eingabebox_close_button.style.cursor = 'pointer';;
                            });

                            let eingabebox_andern_button = document.createElement('button');
                            eingabebox_andern_button.textContent = "Andern";
                            eingabebox_andern_button.style.marginLeft = '15px';
                            eingabebox_close_button.addEventListener('click',() => {
                                let text_aktuell = text_input.value;
                                let eltern_klasse = document.querySelector('.eltern_element_div');
                                eltern_klasse.textContent = text_aktuell;
                            });
                            eingabebox_andern_button.addEventListener('mouseenter',() => {
                                eingabebox_andern_button.style.cursor = 'pointer';
                            });

                            container_sammler.appendChild(text_eingabe_box);
                            text_eingabe_box.appendChild(text_input);
                            text_eingabe_box.appendChild(eingabebox_close_button);
                            text_eingabe_box.appendChild(eingabebox_andern_button);
                            text_bearb++;
                        } else {
                            container_sammler.removeChild(text_eingabe_box);
                            bank_menu.style.filter = 'none';
                            text_bearb--;
                        };
                    });

                    bank_menu.appendChild(forum_bearbeiten_knopf);
                    bank_menu.appendChild(delete_knopf);
                    bank_menu.appendChild(close_bank_button);
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
                    container_sammler.appendChild(bank_menu);
            }; 
        };

        // In Bankmenu_Box als solches einbauen, das es dort eine schlie0 Funktion gibt
        // if(element_aktuell.id === bankmenu_box_id){
        //     element_aktuell.style.filter = 'none';
        //     blur--;
        //         let letzte = container_sammler.lastChild;
        //         container_sammler.removeChild(letzte);
        // };
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
        div.style.height = '25px';
        div.style.padding = "3px";
        div.style.marginTop = "10px";
        if(links_schieben === 0){
            div.style.marginLeft = "80px";
            links_schieben = 1;
        } else {
            div.style.marginLeft = "0px";
            links_schieben = 0;
        };

        // div.style.backgroundColor = randomfarbe;
        div.innerHTML = textwert;
        blur_box_counter++;
        div.id = `${blur_box_counter}`;
        container_sammler.appendChild(div);
    }else {alert("Keine Zugriffsrechte!")} 
})};