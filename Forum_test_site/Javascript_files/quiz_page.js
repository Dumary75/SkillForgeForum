"use strict";

// QUIZ IST NOCH IM TESTMODI //

/* Die ganzen Selektoren */ 
let quiz_box = document.querySelector('.fragen');
let antworten = document.querySelector('.antworten');
let next_button = document.querySelector('.next');
let question_counter = document.querySelector('.quiz_anzahl_counter');
let question_timer = document.querySelector('.quiz_timer');

// Fragen_array für multiple_wahl
let multiple_ausgewahlt = [];

/* -- Die Funktion der Seite -- */
const Quizdata = [

    // {
    //     frage: "Welche Haustiere \n haben die Simpsons?",
    //     options: ["Hund", "Katze", "Fisch", "Schlange"],
    //     antwort: ["Hund", "Katze"]
    // },

    {
        frage: "Zwei sachen \n können stimmen \n aber stimmen sie?",
        options: ["eins", "zwei", "ja", "nein"],
        antwort: ["eins", "ja"]
    },

    {
        frage: "Was ist 5*5?",
        options: [11,23,25,32],
        antwort: 25
    }

    // {
    //     frage: "Wie geht der ewig lange Satz hier zuende?",
    //     options: ["so","ne oder", "lalala","aufkeinen"],
    //     antwort: "so"
    // }

];

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
    const frageText = Quizdata[frage_index].frage;
    quiz_box.innerText = frageText;
    question_counter.innerText = `${frage_index + 1} / ${Quizdata.length}`;
    multiple_ausgewahlt = [];
}


let wahl = 0;

// Hier werden die Antworten, je nach ersteller Anzahl gerendert //
function antwortenrendern() {
       let antwort_index = 0;
       antworten.innerHTML = '';
                testantworten.forEach(function(antwortText) {
                    // Die Erzerzeung hier dynmisch gestalten anstatt nur <4 //
                    if(antwort_index < Quizdata[frage_index].options.length){
                        const liElement = document.createElement('button');
                        liElement.value = Quizdata[frage_index].options[antwort_index];
                        liElement.textContent = Quizdata[frage_index].options[antwort_index];
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
    const multiple_choice = Quizdata[frage_index].antwort.length > 1;

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
            

let counter = 30;
let abgelaufen_alarm = 0;
let wahltest = document.querySelector('.ausgewahlt');
let quiz_aktutell_score = 0;

// Next_Button //
next_button.addEventListener('click', () => {

    // Frage_value mit ausgewählten Antwort_value gegenprüfen //
    let markiert = document.querySelector('.markiert');
    const fragesache = Quizdata[frage_index].antwort.toString();
    const richtig_antwort = Quizdata[frage_index].antwort;
    const multiple_choice = Quizdata[frage_index].antwort.length > 1;

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
    let Quizdata_gesamt = Quizdata.length - 1

    if(frage_index < Quizdata_gesamt){
        frage_index++;
        quizrendern();
        antwortenrendern();
        counter = 30;
    // Der Abschlusstext samt score Anzeige, Score wird überschrieben sobald mehr pkt als davor //
    } else {
        alert(`Das war es! \n Du hast ${quiz_aktutell_score} von ${Quizdata.length} Fragen \n  richtig beantwortet!`);
        let quiz_score = localStorage.getItem('score');
        if(quiz_score === null){
            quiz_score = 0;
                          };
        if(quiz_aktutell_score > quiz_score){
            quiz_score += quiz_aktutell_score;
            localStorage.setItem('quiz_score', quiz_score);
            console.log(quiz_score);
        };
        let quiz_again_question = prompt('Nochmal eine Runde?');
        if(quiz_again_question !== null){
            let again_antwort = quiz_again_question.toLowerCase;
            if(quiz_again_question == "ja"){
                alert("SUPER!");
                // Funktioniert soweit, ist auch im Localstorage hinterlegt
                location.reload();
            } else {
                alert("Schade!")
            };
        };
    };
        
});

// Timer der herunterzählt //
function runtergehen() {
    if(counter >0){
        counter--;
        question_timer.innerText = counter;
    }
    else if(abgelaufen_alarm === 0){
        alert("Du bist zu langsam!");
        abgelaufen_alarm = 1;
        location.reload();
    };

    let interval = setTimeout(runtergehen, 1000);
};

// Funktionen bei Seiten_laden diretk generieren //
function seiteladen() {
    quizrendern();
    runtergehen();
    antwortenrendern();
};

window.onload = seiteladen;