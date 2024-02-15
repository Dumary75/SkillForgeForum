"use strict";

// QUIZ IST NOCH IM TESTMODI //

/* Die ganzen Selektoren */ 
let quiz_box = document.querySelector('.fragen');
let antworten_liste = document.querySelector('.antworten_liste');
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
    }
];

// Logik der Questionbox //
let frage_index = 0;

function quizrendern() {
    quiz_box.innerText = Quizdata[frage_index].frage;
    question_counter.innerText = `${frage_index + 1} / ${Quizdata.length}`;
    };

let counter = 30;
let abgelaufen_alarm = 0;

// Next_Button //
next_button.addEventListener('click', () => {
    frage_index++;
    quizrendern();
    counter = 30;
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
};

window.onload = seiteladen;