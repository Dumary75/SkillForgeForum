"use strict";

// QUIZ IST NOCH IM TESTMODI //

/* Die ganzen Selektoren */ 
let quiz_box = document.querySelector('.fragen');
let antworten = document.querySelector('.antworten');
let next_button = document.querySelector('.next');
let question_counter = document.querySelector('.quiz_anzahl_counter');
let question_timer = document.querySelector('.quiz_timer');

/* -- Die Funktion der Seite -- */
const Quizdata = [
    {
        frage: "Was ist 1+1?",
        options: [1,2,3,4],
        antwort: 2
    },

    {
        frage: "Was ist 3*3?",
        options: [3,6,9,12],
        antwort: 9
    },

    {
        frage: "Was ist 5*5?",
        options: [11,23,25,32],
        antwort: 25
    },

    {
        frage: "Welches Haustier haben die Simens?",
        options: ["Hund", "Katze", "Fisch", "Schlange"],
        antwort: "Hund"
    }
];

const testantworten = [1,2,3,4];

// Logik der Questionbox //
let frage_index = 0;

function quizrendern() {
    quiz_box.innerText = Quizdata[frage_index].frage;
    question_counter.innerText = `${frage_index + 1} / ${Quizdata.length}`;
    };

let wahl = 0;

// Funktioniert soweit! Aber muss noch bei drücken von Nextbutton mit Antwort gegengeprüft werden //
function antwortenrendern() {
       let antwort_index = 0;
       antworten.innerHTML = '';
                testantworten.forEach(function(antwortText) {
                    // Die Erzerzeung hier dynmisch gestalten anstatt nur <4 //
                    if(antwort_index < 4){
                        const liElement = document.createElement('button');
                        liElement.value = Quizdata[frage_index].options[antwort_index];
                        liElement.textContent = Quizdata[frage_index].options[antwort_index];
                        antwort_index++;
                        liElement.classList.add('antwortknopf');
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
    markierte_buttons.forEach(button => button.classList.remove('markiert'));

    const button_momentan = event.target;
    button_momentan.classList.add('markiert');
};
            

let counter = 30;
let abgelaufen_alarm = 0;
let wahltest = document.querySelector('.ausgewahlt');

// Next_Button //
next_button.addEventListener('click', () => {

    // Frage_value mit ausgewählten Antwort_value gegenprüfen //
    let markiert = document.querySelector('.markiert');
    if(markiert){
        const fragesache = Quizdata[frage_index].antwort.toString();
        const antwort_wert = document.querySelector(".markiert").value;
        
        if(antwort_wert === fragesache){
            alert("Richtig!");
        } else {
            alert("Nope!");
        };
    } else {
        alert("Es wurde nichts gewählt, nochmal anfangen!");
        location.reload();
    };

    /* Das redern begrenzen, das quasi am Array von Quiz.length es aufhört,
        momentan wirft er einen Fehler aus, anstatt zu stoppen,
        später dann noch Auswertung einfügen und addieren von Punkten zu gesamter Punktzahl,
        falls mehr Punkte in Quiz erreicht wurden als davor nur hinzufügen,
        wie in Games mit dem Highscore_System */
        
    frage_index++;
    quizrendern();
    antwortenrendern();
    counter = 30;
});

// Timer der herunterzählt //
function runtergehen() {
    if(counter >0){
        counter--;
        question_timer.innerText = counter;
    }
    else if(abgelaufen_alarm === 0){
        // alert("Du bist zu langsam!");
        // abgelaufen_alarm = 1;
        // location.reload();
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