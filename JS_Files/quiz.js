"use strict"

 // > Account_current_state Logic //  
 let account_state = document.querySelector('.login_state');
 window.addEventListener('load', () => {
       let acc_token = JSON.parse(localStorage.getItem("loginToken"))
       if(acc_token){
         account_state.style.backgroundColor = '#0cb11a';
         account_state.innerText = 'eingeloggt';    
         account_state.style.color = '#FFF';
         account_state.style.fontSize = '1.5rem';
         account_state.style.textTransform = 'uppercase';
       };
 });

// --- Header Click Event --- //

let header_default = document.querySelector('header');
let main_container = document.querySelector('.main_container');
let header_blocks = document.querySelectorAll('.header_blocks_default');
let header_headline = document.querySelector('.header_headline');
// let footer = document.querySelector('footer');

header_headline.addEventListener('click', () => {
       header_default.classList.toggle('pressed');
       header_headline.classList.toggle('header_headline_pressed');

       header_blocks.forEach(header_block => {
              header_block.classList.toggle('pressed_header_blocks');
       });

       main_container.classList.toggle('pressed_blurry_effect');
    //    footer.classList.toggle('pressed_blurry_effect');
   });



//-----------------------MAIN_CONTENT-------------------------------------------//

//---- QUIZ_SELECTION ----//
let quest_answer_field = document.querySelector('.quest_answer');
let quest_create_field = document.querySelector('.quest_create');

// Questcreate and section blogs 
let quest_selection_list = document.querySelector('.quest_selection_list');
let quest_user_create_field = document.querySelector('.user_input_create_input');

// --- DEV QUESTIONS --- //

const quizData = [
    {
        category: 'Geschichte',
        questions: [
            {
                question: 'Wer war der erste Präsident der USA?',
                answers: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'],
                correctAnswer: 'George Washington'
            },
            {
                question: 'In welchem Jahr begann der Zweite Weltkrieg?',
                answers: ['1914', '1939', '1945', '1929'],
                correctAnswer: '1939'
            }
        ]
    },
    {
        category: 'Wissenschaft',
        questions: [
            {
                question: 'Was ist das chemische Symbol für Wasser?',
                answers: ['O2', 'H2O', 'CO2', 'NaCl'],
                correctAnswer: 'H2O'
            },
            {
                question: 'Wer entwickelte die Relativitätstheorie?',
                answers: ['Isaac Newton', 'Nikola Tesla', 'Albert Einstein', 'Marie Curie'],
                correctAnswer: 'Albert Einstein'
            }
        ]
    },
    {
        category: 'Sport',
        questions: [
            {
                question: 'Wie viele Spieler hat eine Fußballmannschaft?',
                answers: ['9', '10', '11', '12'],
                correctAnswer: '11'
            },
            {
                question: 'In welchem Jahr fanden die ersten modernen Olympischen Spiele statt?',
                answers: ['1896', '1900', '1924', '1936'],
                correctAnswer: '1896'
            }
        ]
    }
];

// Pages proof
window.addEventListener('load', () => {
    const currentPath = window.location.pathname;

    if(currentPath.includes('quiz_selection.html')){

// Page_Selection
quest_create_field.addEventListener('click', () => {
    quest_create_field.style.display = 'none';
    quest_answer_field.style.display = 'none';
    quest_selection_list.style.display = 'none';
    quest_user_create_field.classList.add('selection_active');
});

quest_answer_field.addEventListener('click', () => {
    quest_create_field.style.display = 'none';
    quest_answer_field.style.display = 'none';
    quest_user_create_field.style.display = 'none';
    quest_selection_list.classList.add('selection_active');
        });

// --- QUEST_USER_CREATE site Logic --- //

// Maximale Anzahl an Antworten
const MAX_ANSWERS = 4;
const MIN_ANSWERS = 2;

let answerCount = MIN_ANSWERS;
const answerContainer = document.getElementById('answerContainer');
const addAnswerBtn = document.getElementById('addAnswerBtn');
const removeAnswerBtn = document.getElementById('removeAnswerBtn');
const saveQuestionBtn = document.getElementById('saveQuestionBtn');
const categorySelect = document.getElementById('categorySelect');
const questionInput = document.getElementById('questionInput');

// Array, das die richtigen Antworten speichert
let correctAnswers = [];

// Funktion zum Erstellen einer Antwortbox
function createAnswerBox(index) {
    const answerBox = document.createElement('div');
    answerBox.classList.add('answer-box');
    answerBox.setAttribute('data-index', index);

    // Eingabefeld für die Antwort
    const answerInput = document.createElement('textarea');
    answerInput.classList.add('answer-input');
    answerInput.placeholder = `Antwort ${index + 1}`;

    // Checkbox zum Markieren der richtigen Antwort
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', (e) => toggleCorrectAnswer(e, index));

    // Antwortbox zur Antwort-Container hinzufügen
    answerBox.appendChild(answerInput);
    answerBox.appendChild(checkbox);
    answerContainer.appendChild(answerBox);
}

// Initialer Zustand: Mindestens zwei Antwortboxen anzeigen
for (let i = 0; i < MIN_ANSWERS; i++) {
    createAnswerBox(i);
}

// Antwortbox hinzufügen
addAnswerBtn.addEventListener('click', () => {
    if (answerCount < MAX_ANSWERS) {
        createAnswerBox(answerCount);
        answerCount++;
    } else {
        alert('Maximale Antwortzahl erreicht!');
    };
});

// Antwortbox entfernen
removeAnswerBtn.addEventListener('click', () => {
    if (answerCount > MIN_ANSWERS) {
        answerContainer.removeChild(answerContainer.lastElementChild);
        answerCount--;
    } else {
        alert('Minimum Antwortzahl erreicht!');
    }
});

// Funktion zum Markieren/Ummarkieren einer richtigen Antwort
function toggleCorrectAnswer(event, index) {
    if (event.target.checked) {
        correctAnswers.push(index); // Antwort als richtig markieren
    } else {
        correctAnswers = correctAnswers.filter(i => i !== index); // Antwort als falsch markieren
    }
}

// Funktion zum Speichern der Frage mit den Antworten
saveQuestionBtn.addEventListener('click', (event) => {
    const selectedCategory = categorySelect.value;
    const newQuestion = questionInput.value;

    // Antworten sammeln
    const answers = Array.from(document.querySelectorAll('.answer-input')).map(input => input.value);
    
    // Überprüfung: Der Frage / Antworten
    if (newQuestion === '') {
        event.preventDefault();
        alert('Bitte eine Frage eintippen!');
        return;
    } 
    // else if(answers.value === '') {
    //     event.preventDefault();
    //     alert('Bitte mindestens 2 Antwortmöglichkeiten eintippen!');
    //     return;
    // } 
    else if (correctAnswers.length === 0 ){
        event.preventDefault();
        alert('Bitte mindestens eine richtige Antwort auswählen!');
        return;
    };

    // Neue Frage als Objekt
    const newQuestionObj = {
        question: newQuestion,
        answers: answers,
        correctAnswers: correctAnswers
    };

    // User-Quizfragen aus dem LocalStorage laden
    let userQuizData = JSON.parse(localStorage.getItem('userQuizData')) || [];

    // Kategorie im User-Quiz-Daten-Array finden
    let selectedUserQuiz = userQuizData.find(quiz => quiz.category === selectedCategory);

    if (selectedUserQuiz) {
        // Neue Frage zur bestehenden Kategorie hinzufügen
        selectedUserQuiz.questions.push(newQuestionObj);
    } else {
        // Neue Kategorie erstellen
        userQuizData.push({
            category: selectedCategory,
            questions: [newQuestionObj]
        });
    }

    // Speichere das aktualisierte User-Quiz-Daten-Array im LocalStorage
    localStorage.setItem('userQuizData', JSON.stringify(userQuizData));

    alert('Frage erfolgreich gespeichert!');
    
    // Felder zurücksetzen
    questionInput.value = '';
    answerContainer.innerHTML = '';  // Antwortboxen löschen
    correctAnswers = [];  // Markierungen zurücksetzen
    answerCount = MIN_ANSWERS;  // Wieder auf zwei Antworten setzen
    for (let i = 0; i < MIN_ANSWERS; i++) {
        createAnswerBox(i);
    }
});
    } else {
// --- QUEST_ANSWER site Logic --- //


    };
});





