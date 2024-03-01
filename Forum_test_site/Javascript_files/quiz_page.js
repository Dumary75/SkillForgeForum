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
    //     frage: "Was ist 1+1?", 
    //     options: [1,2,3,4],
    //     antwort: 2
    // },

    // {
    //     frage: "Was ist 3*3?",
    //     options: [3,6,9,12],
    //     antwort: 9
    // },

    // {
    //     frage: "Was ist 5*5?",
    //     options: [11,23,25,32],
    //     antwort: 25
    // },

    {
        frage: "Welche Haustiere \n haben die Simpsons?",
        options: ["Hund", "Katze", "Fisch", "Schlange"],
        antwort: ["Hund", "Katze"]
    },

    {
        frage: "Zwei sachen können stimmen \n aber stimmen sie?",
        options: ["eins", "zwei", "ja", "nein"],
        antwort: ["eins", "ja"]
    },

        {
        frage: "Was ist 5*5?",
        options: [11,23,25,32],
        antwort: 25
    }
];

const testantworten = [1,2,3,4];

// -- Logik der Questionbox -- //
let frage_index = 0;
// Umbruch erzwingen, falls Text zu lange ist //
const maximallang = 12;
const maximallang_großer = 38;

// Test -> Selektor //
const mittlerer_bereich = document.querySelector('.mittlerer_bereich');
const unterer_bereich = document.querySelector('.unterer_bereich');

function quizrendern() {
    const frageText = Quizdata[frage_index].frage;
    quiz_box.innerText = frageText;
    question_counter.innerText = `${frage_index + 1} / ${Quizdata.length}`;
    multiple_ausgewahlt = [];
    
    if (frageText.length > maximallang) {
        quiz_box.style.left = '22px';
        mittlerer_bereich.style.height = '144px';
        unterer_bereich.style.border = 'border: 0.5px solid #000';
    } else if(frageText.length > maximallang_großer){
        quiz_box.style.left = '11px';
        mittlerer_bereich.style.height = '168px';
    } else {
        quiz_box.style.left = '51px';
        mittlerer_bereich.style.height = '120px';
        // unterer_bereich.style.border = 'none';
    };
}


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
    const button_momentan = event.target;
    const multiple_choice = Quizdata[frage_index].antwort.length > 1;

    if(multiple_choice){
        const button_momentan = event.target;
        if(!button_momentan.classList.contains('markiert')){
            button_momentan.classList.add('markiert');
            multiple_ausgewahlt.push(button_momentan.value);
        } else {
            button_momentan.classList.remove('markiert');
            // Entfernen funktioniert noch nicht //
            // multiple_ausgewahlt.remove(button_momentan);
            // console.log(multiple_ausgewahlt);
        };

    } else {
        markierte_buttons.forEach(button => button.classList.remove('markiert'));
        button_momentan.classList.add('markiert');
    }
};
            

let counter = 30;
let abgelaufen_alarm = 0;
let wahltest = document.querySelector('.ausgewahlt');

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
            } else {
                alert('nope!');
            }
        } else {
            if(antwort_wert === fragesache){
                alert("Richtig!");
            } else {
                alert("Nope!");
            };
        }
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