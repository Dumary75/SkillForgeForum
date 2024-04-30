"use strict";

/* Die ganzen Selektoren */ 
let quiz_box = document.querySelector('.fragen');
let antworten = document.querySelector('.antworten');
let next_button = document.querySelector('.next');
let question_counter = document.querySelector('.quiz_anzahl_counter');
let question_timer = document.querySelector('.quiz_timer');
// Der Blocker //
let quiz_start_button = document.querySelector('.quiz_start_button');
let quiz_blocker_box = document.querySelector('.quiz_blocker');
let seitenaufruf = 0;

// QUIZ KATEGORIEN TEST //

let kategorie_box = document.querySelector('.quiz_kategorien');
let test_kategorie_button = document.querySelectorAll('.quiz_kategorien button');
let kategorie_text = document.querySelector('.kategorie_text');
let kategorie_gewalht = '';
let quiz_kategorie;

// User_Fragen blocken wenn keien vorhanden
test_kategorie_button.forEach( button => {
    button.addEventListener('click', () => {
        kategorie_box.style.display = 'none';
        kategorie_gewalht = button.innerText;
        kategorie_text.innerText = ` 
        Es wurde folgende Kategorie gewählt: ${kategorie_gewalht}`;
        quiz_kategorie = Quizdata[kategorie_gewalht];
    });
});

// Blocker bevor Quiz startet //
quiz_start_button.addEventListener('click', () => {
    quiz_blocker_box.style.display = 'none';
    counter = 30;
    if(seitenaufruf === 0){
        seiteladen();
        seitenaufruf++;
    } else {
        quizrendern();
        antwortenrendern();
    };
});

// Fragen_array für multiple_wahl
let multiple_ausgewahlt = [];

/* -- Die Funktion der Seite -- */
const Quizdata = {

    Dev_Fragen: [
        {
            frage: "Wie geht der ewig lange Satz hier zuende?",
            options: ["so","ne oder", "lalala","aufkeinen"],
            antwort: "so"
        },

        {
            frage: "Geht das hier?",
            options: ["ja","nein"],
            antwort: "ja"
        }
    ],

    User_Fragen: [
        
    ],

    Test: [
        {
            frage: "Wie geht der ewig lange Satz hier zuende?",
            options: ["so","ne oder", "lalala","aufkeinen"],
            antwort: "so" 
        }
    ]
};

const testantworten = [1,2,3,4];

// -- Logik der Questionbox -- //
let frage_index = 0;
// Umbruch erzwingen, falls Text zu lange ist //
const maximallang = 12;
const maximallang_großer = 24;

// Test -> Selektor //
const mittlerer_bereich = document.querySelector('.mittlerer_bereich');
const unterer_bereich = document.querySelector('.unterer_bereich');

function quizrendern() {
    const frageText = quiz_kategorie[frage_index].frage;
    quiz_box.innerText = frageText;
    question_counter.innerText = `${frage_index + 1} / ${quiz_kategorie.length}`;
    multiple_ausgewahlt = [];
}


let wahl = 0;

// Hier werden die Antworten, je nach ersteller Anzahl gerendert //
function antwortenrendern() {
       let antwort_index = 0;
       antworten.innerHTML = '';
                testantworten.forEach(function(antwortText) {
                    // Die Erzerzeung hier dynmisch gestalten anstatt nur <4 //
                    if(antwort_index < quiz_kategorie[frage_index].options.length){
                        const liElement = document.createElement('button');
                        liElement.value = quiz_kategorie[frage_index].options[antwort_index];
                        liElement.textContent = quiz_kategorie[frage_index].options[antwort_index];
                        antwort_index++;
                        // liElement.classList.add('antwortknopf');
                        antworten.appendChild(liElement);

                        liElement.addEventListener('click', (event) => {
                            event.preventDefault();
                            auswahlen(event);          
                        });
                    };
                });
            };

// Test wegen dem selektieren von Antwort, mit BG_color
function auswahlen(event){
    const markierte_buttons = document.querySelectorAll('.markiert');
    const button_momentan = event.target;
    const multiple_choice = quiz_kategorie[frage_index].antwort.length > 1;

    if(multiple_choice){
        const button_momentan = event.target;
        if(!button_momentan.classList.contains('markiert')){
            button_momentan.classList.add('markiert');
            multiple_ausgewahlt.push(button_momentan.value);
        } else {
            button_momentan.classList.remove('markiert');
    // Finde den Index des Elements im Array
    const index = multiple_ausgewahlt.indexOf(button_momentan.value);

    // Entferne das Element, wenn es im Array ist
    if (index !== -1) {
        multiple_ausgewahlt.splice(index, 1);
    }
        };

    } else {
        markierte_buttons.forEach(button => button.classList.remove('markiert'));
        button_momentan.classList.add('markiert');
    }
};
            

let counter = 999;
let wahltest = document.querySelector('.ausgewahlt');
let quiz_aktutell_score = 0;

// Next_Button //
next_button.addEventListener('click', () => {
    // Frage_value mit ausgewählten Antwort_value gegenprüfen //
    let markiert = document.querySelector('.markiert');
    const fragesache = quiz_kategorie[frage_index].antwort.toString();
    const richtig_antwort = quiz_kategorie[frage_index].antwort;
    const multiple_choice = quiz_kategorie[frage_index].antwort.length > 1;

    if(markiert){
        const antwort_wert = document.querySelector(".markiert").value;
        if(multiple_choice){
            if(JSON.stringify(multiple_ausgewahlt) === JSON.stringify(richtig_antwort)){
                alert("Richtig!");
                quiz_aktutell_score++;
            } else {
                alert('nope!');
            }
        } else {
            if(antwort_wert === fragesache){
                alert("Richtig!");
                quiz_aktutell_score++;
            } else {
                alert("Nope!");
            };
        }
    } else {
        alert("Es wurde nichts gewählt, nochmal anfangen!");
        location.reload();
    };

    // Das ganze rendern begrenzen, das sobald max Anzahl erreicht wurde, es nicht rendert //
    let Quizdata_gesamt = quiz_kategorie.length - 1

    if(frage_index < Quizdata_gesamt){
        frage_index++;
        quizrendern();
        antwortenrendern();
        counter = 30;
    // Der Abschlusstext samt score Anzeige, Score wird überschrieben sobald mehr pkt als davor //
    } else {
        alert(`Das war es! \n Du hast ${quiz_aktutell_score} von ${quiz_kategorie.length} Fragen \n  richtig beantwortet!`);
        let quiz_score = localStorage.getItem('score');
        if(quiz_score === null){
            quiz_score = 0;
                          };
        if(quiz_aktutell_score > quiz_score){
            quiz_score += quiz_aktutell_score;
            localStorage.setItem('quiz_score', quiz_score);
            score_system_page.innerText = `${quiz_score}`;
        };
        let quiz_again_question = prompt('Nochmal eine Runde?');
        if(quiz_again_question !== null){
            let again_antwort = quiz_again_question.toLowerCase;
            if(quiz_again_question == "ja"){
                alert("SUPER!");
                frage_index = 0;
                seiteladen();
            } else {
                alert("Schade!")
            };
        };
    };
        
});

// --> User_Fragen hinzufügen <-- //

let user_erstellen_fragen = document.querySelector('.user_input_question');
let user_fragen_container = document.querySelector('#frageEingabe');
let checkbox_container = document.querySelector('.checkbox_container');
let checkbox_user_solution = document.querySelector('.user_solution_checkbox');
let placeholder_zahl = 2;
let antwort_anzahl = 2;
const user_losung = [];

// Auf vorgertigte Antwortfelder reagieren, auch die vorgfertigten Labels dazu
let definedUserAnswerFields = document.querySelectorAll('input[type="text"]');
definedUserAnswerFields.forEach(inputField => {
    inputField.addEventListener('input', function(event) {
        const label = document.querySelector(`label[for="${event.target.id}"]`);
        if(label){
            label.textContent = event.target.value;
        };
    });
});

// Hizugefügte Antworten prüfen, sonst wird zu viel bei Frage erstellen gelöscht!
let neueantort = 0;

function frageHinzufuegen() {
    // !---- Nach dem pushen von neuer Frage, diese leeren, das die Felder geleert sind ----! //
    const frage = document.getElementById("frage").value;
    const antworten = [];
    quiz_blocker_box.style.display = 'block';
    counter = 999;
    // Die Optionen was man als Antwort auswählen kann pushen
    document.querySelectorAll(".antwort").forEach(input => {
        antworten.push(input.value);
        // Die Antwort_felder nach dem pushen leeren //
        input.value = '';
        if(antwort_anzahl === 3){
            for(let i = 0; i < 1; i++){
                antwortentfernen();
            };
        } else if(antwort_anzahl === 4){
            antwortentfernen();
            antwortentfernen();
        };
    });
   
    const neueFrage = {
        frage: frage,
        options: antworten,
        antwort: user_losung
    };

    Quizdata.user.push(neueFrage);
    alert('Neue Frage wurde hinzugefügt!');
    console.log(Quizdata.user);
    // console.log(neueFrage.antwort);
    frage_index = 0;
    // Das User_Frage_feld nach dem pushen leeren //
    let reine_frage = document.getElementById("frage");
    reine_frage.value = '';
    // Die Checkboxen nach dem pushen wieder "ungekickt" machen, klappt halbwegs //
    const checkboxes = document.querySelectorAll('.user_solution_checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };
// } else{
//     alert('Es wurde nichts eingegeben!')
// };

let antwort_drinnen = 0;
// Entfernen zählen wegen der Container Position
let entfernenanzahl = 0;

let user_answer_box = document.querySelector('.user_answer_box');
// User_Antworten hinzufügen //
function antwortHinzufuegen() {
    if(antwort_anzahl < 4){
                entfernenanzahl++
                // Höhe von gesamen Userfragen Container vergrößern //
                let user_fragen_container_height = user_fragen_container.offsetHeight;
                let new_user_fragen_height = user_fragen_container_height + 60;
                user_fragen_container.style.height = `${new_user_fragen_height}px`;
                // Höhe von gesamten Checkbox_div verschieben //
                // checkbox_container //
                if(antwort_anzahl < 3){
                checkbox_container.style.bottom = '-120px';
                } else {
                    checkbox_container.style.bottom = '-160px';
                };

        let weitere_antwort = document.createElement('input');
        let kunstlich_br = document.createElement('br');
        placeholder_zahl++;
        antwort_anzahl++;
        weitere_antwort.type = 'text';
        weitere_antwort.classList.add('antwort');
        weitere_antwort.placeholder = `Antwort ${placeholder_zahl}`;
        weitere_antwort.style.color = '#000';
        weitere_antwort.style.marginBottom = '10px';
        // Checkboxen erstellen zur Antwort
        let weitere_checkbox = document.createElement('input');
        weitere_checkbox.type = 'checkbox';
        weitere_checkbox.classList.add(".user_solution_checkbox");
        weitere_checkbox.value = placeholder_zahl;
        weitere_checkbox.id = (`Antwort_${placeholder_zahl}`);
        user_answer_box.appendChild(weitere_antwort);
        checkbox_container.appendChild(weitere_checkbox);
        let label_neue_checkbox = document.createElement('label');
        label_neue_checkbox.classList.add('weitere_antwort_label');
        label_neue_checkbox.textContent = `Antwort  ${placeholder_zahl}`;
        label_neue_checkbox.id = (`Antwort_${placeholder_zahl}`);
        checkbox_container.appendChild(label_neue_checkbox);
        // Labeltext direkt ändern mit Antwort_text sobald geändert
           weitere_antwort.addEventListener('input',function(event) {
              label_neue_checkbox.textContent = weitere_antwort.value;
                });
        checkbox_container.appendChild(kunstlich_br);
        /* Inhalt von Label für zugehörige Antwort abfangen 
        und das in das Array der Lösungen pushen */
        weitere_checkbox.addEventListener('change', function(event) {
            // Neuer Klasse hinzufügen, wenn auf eine Checkbox geklickt wird
            event.target.classList.toggle('XXZYXX');
            const labelInhalt = label_neue_checkbox.textContent;
            if (event.target.classList.contains('XXZYXX')) {
                // Inhalt des zugehörigen Labels in das Array pushen
                user_losung.push(labelInhalt);
            } else {
                // Inhalt des zugehörigen Labels aus dem Array entfernen
                const index = user_losung.indexOf(labelInhalt);
                if (index !== -1) {
                    user_losung.splice(index, 1);
                }
            }
        });
    }else{
        alert("Nicht mehr als 4 Antworten zugelassen!");
    };
};

function antwortentfernen(){
    const fragen_sammlung = user_erstellen_fragen;
    const neuste_antwort = user_answer_box.lastElementChild;
    // Abfrage der Antworten_box + Checkboxen //
    if(neuste_antwort && neuste_antwort.classList.contains('antwort')){
        // Zusätzliche Prüfung, damit wirklich nur neuste Antorten > 2 nach Vorgabe gelöscht werden /
        if(antwort_anzahl > 2){
            // Höhe bei entfernen von Checkbox_container anpassen //
            // HÖHE MUSS NOCH RICHTIG EINGESTELLT WERDEN !! //
            if(entfernenanzahl === 2){
                checkbox_container.style.bottom = '-125px';
                user_fragen_container.style.height = '470px';
                } 
            if(entfernenanzahl === 1){
                checkbox_container.style.bottom = '-95px';
                user_fragen_container.style.height = '25.5rem';
                };
            user_answer_box.removeChild(neuste_antwort);
            for(let i = 0; i < 3; i++){
                checkbox_container.removeChild(checkbox_container.lastElementChild);
            };
            antwort_anzahl--;
            placeholder_zahl--;
            entfernenanzahl--;
            // Gröse des Containers anpassen //
            // let user_fragen_container_height = user_fragen_container.offsetHeight;
            // let new_user_fragen_height = user_fragen_container_height - 30;
            // user_fragen_container.style.height = `${new_user_fragen_height}px`;
        } else{
            alert('Es gibt keine neu erstellte Antworten!');
        };
    };
};

// GPT Toggle Funktion zum adden der Lösung mit der Klasse
checkbox_container.addEventListener('change', function(event) {
    // Überprüfen, ob das ausgelöste Event von einer Checkbox stammt
    if (event.target.matches('.user_solution_checkbox')) {
        // Neuer Klasse hinzufügen, wenn auf eine Checkbox geklickt wird
        event.target.classList.toggle('XXZYXX');
        
        // Textinhalt des zugehörigen Labels abrufen
        const label = document.querySelector(`label[for="${event.target.id}"]`);
        if (label) {
            const labelInhalt = label.textContent;
            if (event.target.classList.contains('XXZYXX')) {
                // Inhalt des zugehörigen Labels in das Array pushen
                user_losung.push(labelInhalt);
            } else {
                // Inhalt des zugehörigen Labels aus dem Array entfernen
                const index = user_losung.indexOf(labelInhalt);
                if (index !== -1) {
                    user_losung.splice(index, 1);
                };
            };
        };
    };
});

// Timer der herunterzählt //
function runtergehen() {
    if(counter > 0){
        counter--;
        question_timer.innerText = counter;
        setTimeout(runtergehen,1000);
    }
    // !--> WIRD GERADE WEGEN TESTS BLOCKIERT <--! //
    else { // Den Timer neustarten // 
        // frage_index = 0;
        // counter = 30;
        // seiteladen();
        // alert("Du bist zu langsam!");
 };
};

// Funktionen bei Seiten_laden direkt generieren //
function seiteladen() {
    quizrendern();
    antwortenrendern();
    runtergehen();
};
