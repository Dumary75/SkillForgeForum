"use strict"

 // > Account_current_state Logic //  
 let account_state = document.querySelector('.login_state');
 window.addEventListener('load', () => {
       let acc_token = JSON.parse(localStorage.getItem("loginToken"))
       if(acc_token){
        account_state.style.backgroundColor = '#0cb11a';
        account_state.innerText = 'eingeloggt';    
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
        category: 'Natur',
        questions: [
            {
                question: 'Welcher Baum ist der höchste der Welt?',
                answers: ['Mammutbaum', 'Eiche', 'Baobab', 'Ahorn'],
                correctAnswer: 'Mammutbaum'
            },
            {
                question: 'Welche dieser Pflanzen betreiben Photosynthese?',
                answers: ['Kaktus', 'Algen', 'Blumen', 'Pilze'],
                correctAnswer: ['Kaktus', 'Algen', 'Blumen']
            },
            {
                question: 'Welches Tier lebt sowohl an Land als auch im Wasser?',
                answers: ['Frosch', 'Krokodil', 'Robbe', 'Fledermaus'],
                correctAnswer: ['Frosch', 'Krokodil']
            },
            {
                question: 'Welche Planeten haben Ringe?',
                answers: ['Jupiter', 'Saturn', 'Uranus', 'Neptun'],
                correctAnswer: ['Jupiter', 'Saturn', 'Uranus', 'Neptun'] // Alle richtig
            },
            {
                question: 'Welches dieser Tiere ist ein Säugetier?',
                answers: ['Wal', 'Hai', 'Delphin', 'Schildkröte'],
                correctAnswer: ['Wal', 'Delphin']
            },
            {
                question: 'Welche dieser Wüsten befinden sich in Afrika?',
                answers: ['Sahara', 'Kalahari', 'Gobi', 'Namib'],
                correctAnswer: ['Sahara', 'Kalahari', 'Namib']
            },
            {
                question: 'Welches ist das giftigste Tier der Welt?',
                answers: ['Pfeilgiftfrosch', 'Steinfisch', 'Schwarzspitzen-Riffhai', 'Kegelschnecke'],
                correctAnswer: ['Pfeilgiftfrosch', 'Kegelschnecke']
            },
            {
                question: 'Was ist die häufigste Gasart in der Erdatmosphäre?',
                answers: ['Sauerstoff', 'Stickstoff', 'Kohlendioxid', 'Wasserstoff'],
                correctAnswer: 'Stickstoff'
            },
            {
                question: 'Welche dieser Tiere können fliegen?',
                answers: ['Adler', 'Fledermaus', 'Kolibri', 'Pinguin'],
                correctAnswer: ['Adler', 'Fledermaus', 'Kolibri']
            },
            {
                question: 'Welche dieser Tiere sind Kaltblüter?',
                answers: ['Krokodil', 'Eidechse', 'Frosch', 'Schlange'],
                correctAnswer: ['Krokodil', 'Eidechse']
            }
        ]
    },
    {
        category: 'Technik',
        questions: [
            {
                question: 'Welche dieser Erfindungen werden Thomas Edison zugeschrieben?',
                answers: ['Glühbirne', 'Phonograph', 'Filmkamera', 'Automobil'],
                correctAnswer: ['Glühbirne', 'Phonograph', 'Filmkamera']
            },
            {
                question: 'Welches dieser Unternehmen entwickelte das erste Smartphone?',
                answers: ['Apple', 'Samsung', 'Nokia', 'Motorola'],
                correctAnswer: ['Apple', 'Nokia']
            },
            {
                question: 'Welche dieser Programmiersprachen werden für Web-Entwicklung genutzt?',
                answers: ['JavaScript', 'Python', 'HTML', 'PHP'],
                correctAnswer: ['JavaScript', 'HTML', 'PHP']
            },
            {
                question: 'Welche dieser Geräte speichern Daten?',
                answers: ['Festplatte', 'RAM', 'USB-Stick', 'CPU'],
                correctAnswer: ['Festplatte', 'USB-Stick']
            },
            {
                question: 'Welche Unternehmen entwickeln Elektroautos?',
                answers: ['Tesla', 'BMW', 'Nissan', 'Ford'],
                correctAnswer: ['Tesla', 'BMW', 'Nissan']
            },
            {
                question: 'Welche dieser Wissenschaftler haben zur Elektromagnetik beigetragen?',
                answers: ['James Clerk Maxwell', 'Nikola Tesla', 'Michael Faraday', 'Isaac Newton'],
                correctAnswer: ['James Clerk Maxwell', 'Michael Faraday']
            },
            {
                question: 'Welches dieser Geräte dient zur Bildschirmanzeige?',
                answers: ['Monitor', 'Maus', 'Grafikkarte', 'Bildschirm'],
                correctAnswer: ['Monitor', 'Bildschirm']
            },
            {
                question: 'Welches dieser Symbole repräsentiert elektrische Spannung?',
                answers: ['Volt', 'Ampere', 'Watt', 'Ohm'],
                correctAnswer: 'Volt'
            },
            {
                question: 'Welche dieser Teile sind Bestandteile eines Computers?',
                answers: ['CPU', 'GPU', 'SSD', 'RAM'],
                correctAnswer: ['CPU', 'GPU', 'SSD', 'RAM'] // Alle richtig
            },
            {
                question: 'Welche dieser Erfindungen sind drahtlose Technologien?',
                answers: ['WLAN', 'Bluetooth', 'Infrarot', 'Ethernet'],
                correctAnswer: ['WLAN', 'Bluetooth']
            }
        ]
    },
    {
        category: 'Mathe',
        questions: [
            {
                question: 'Welche dieser Zahlen sind Primzahlen?',
                answers: ['2', '3', '4', '5'],
                correctAnswer: ['2', '3', '5']
            },
            {
                question: 'Welche dieser Gleichungen sind Quadratische Gleichungen?',
                answers: ['x² + 2x + 1 = 0', 'y = 3x + 5', 'x² - 4 = 0', 'z + 1 = 0'],
                correctAnswer: ['x² + 2x + 1 = 0', 'x² - 4 = 0']
            },
            {
                question: 'Welche dieser Brüche sind gleich 0.5?',
                answers: ['1/2', '2/4', '3/6', '2/5'],
                correctAnswer: ['1/2', '2/4', '3/6'] // Alle richtig
            },
            {
                question: 'Was ist die Summe von 15 + 16?',
                answers: ['30', '31', '32', '33'],
                correctAnswer: '31'
            },
            {
                question: 'Welche dieser Werte sind das Ergebnis von 9 x 7?',
                answers: ['63', '54', '72', '81'],
                correctAnswer: '63'
            },
            {
                question: 'Welche dieser Geometrischen Formen haben 4 Seiten?',
                answers: ['Quadrat', 'Rechteck', 'Dreieck', 'Trapez'],
                correctAnswer: ['Quadrat', 'Rechteck', 'Trapez']
            },
            {
                question: 'Was ist die Ableitung von x²?',
                answers: ['2x', 'x', 'x²', '2'],
                correctAnswer: '2x'
            },
            {
                question: 'Welche dieser Winkel sind kleiner als 90 Grad?',
                answers: ['30 Grad', '60 Grad', '120 Grad', '150 Grad'],
                correctAnswer: ['30 Grad', '60 Grad']
            },
            {
                question: 'Welche dieser Zahlen sind durch 5 teilbar?',
                answers: ['10', '15', '25', '35'],
                correctAnswer: ['10', '15', '25', '35'] // Alle richtig
            },
            {
                question: 'Welche dieser Aussagen sind immer wahr?',
                answers: ['1 + 1 = 2', '3 + 3 = 6', '5 + 5 = 11', '2 x 2 = 4'],
                correctAnswer: ['1 + 1 = 2', '3 + 3 = 6', '2 x 2 = 4']
            }
        ]
    },
    {
        category: 'Tiere',
        questions: [
            {
                question: 'Welche dieser Tiere sind Säugetiere?',
                answers: ['Elefant', 'Hai', 'Delfin', 'Pinguin'],
                correctAnswer: ['Elefant', 'Delfin']
            },
            {
                question: 'Welche dieser Tiere können fliegen?',
                answers: ['Adler', 'Fledermaus', 'Kolibri', 'Strauss'],
                correctAnswer: ['Adler', 'Fledermaus', 'Kolibri']
            },
            {
                question: 'Welche dieser Tiere sind Kaltblüter?',
                answers: ['Schlange', 'Frosch', 'Schildkröte', 'Löwe'],
                correctAnswer: ['Schlange', 'Frosch', 'Schildkröte'] // Alle richtig
            },
            {
                question: 'Welche dieser Tiere sind Raubtiere?',
                answers: ['Löwe', 'Wolf', 'Giraffe', 'Bär'],
                correctAnswer: ['Löwe', 'Wolf', 'Bär']
            },
            {
                question: 'Welche dieser Tiere sind nachtaktiv?',
                answers: ['Fledermaus', 'Eule', 'Maus', 'Hund'],
                correctAnswer: ['Fledermaus', 'Eule']
            },
            {
                question: 'Welches Tier legt Eier, obwohl es ein Säugetier ist?',
                answers: ['Schnabeltier', 'Känguru', 'Wal', 'Pferd'],
                correctAnswer: 'Schnabeltier'
            },
            {
                question: 'Welche dieser Tiere können ihren Schwanz abwerfen, um zu entkommen?',
                answers: ['Eidechse', 'Frosch', 'Schlange', 'Wespe'],
                correctAnswer: 'Eidechse'
            },
            {
                question: 'Welches Tier ist für seine "Lachlaute" bekannt?',
                answers: ['Papagei', 'Hyäne', 'Affe', 'Rabe'],
                correctAnswer: 'Hyäne'
            },
            {
                question: 'Welche dieser Tiere sind Wassersäugetiere?',
                answers: ['Wal', 'Robbe', 'Delfin', 'Hai'],
                correctAnswer: ['Wal', 'Robbe', 'Delfin']
            },
            {
                question: 'Welche dieser Tiere haben keine Beine?',
                answers: ['Schlange', 'Wurm', 'Aal', 'Krabbe'],
                correctAnswer: ['Schlange', 'Wurm', 'Aal']
            }
        ]
    },
    {
        category: 'Musik',
        questions: [
            {
                question: 'Wer sang das Lied "Thriller"?',
                answers: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Madonna'],
                correctAnswer: 'Michael Jackson'
            },
            {
                question: 'Welche Instrumentengruppe gehört das Klavier an?',
                answers: ['Saiteninstrumente', 'Tasteninstrumente', 'Schlaginstrumente', 'Blasinstrumente'],
                correctAnswer: ['Saiteninstrumente', 'Tasteninstrumente']
            },
            {
                question: 'Wer komponierte die "Mondscheinsonate"?',
                answers: ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Franz Schubert'],
                correctAnswer: 'Ludwig van Beethoven'
            },
            {
                question: 'Welche Musikrichtungen sind stark mit der E-Gitarre verbunden?',
                answers: ['Klassik', 'Jazz', 'Rock', 'Blues'],
                correctAnswer: ['Rock', 'Blues']
            },
            {
                question: 'Wie viele Saiten hat eine normale Gitarre?',
                answers: ['Vier', 'Sechs', 'Acht', 'Zwölf'],
                correctAnswer: 'Sechs'
            },
            {
                question: 'Welche Musikgruppe sang "Bohemian Rhapsody"?',
                answers: ['Queen', 'The Beatles', 'Led Zeppelin', 'The Rolling Stones'],
                correctAnswer: 'Queen'
            },
            {
                question: 'Welches Instrument spielte Louis Armstrong?',
                answers: ['Klavier', 'Trompete', 'Saxophon', 'Gitarre'],
                correctAnswer: 'Trompete'
            },
            {
                question: 'Wer gilt als der "King of Rock\'n\'Roll"?',
                answers: ['Michael Jackson', 'Elvis Presley', 'Chuck Berry', 'James Brown'],
                correctAnswer: 'Elvis Presley'
            },
            {
                question: 'Welches dieser Instrumente wird typischerweise im Jazz verwendet?',
                answers: ['Saxophon', 'Klavier', 'Trompete', 'Gitarre'],
                correctAnswer: ['Saxophon', 'Klavier', 'Trompete'] // Alle richtig
            },
            {
                question: 'Welcher Sänger ist bekannt für das Lied "Shape of You"?',
                answers: ['Justin Bieber', 'Ed Sheeran', 'Shawn Mendes', 'Sam Smith'],
                correctAnswer: 'Ed Sheeran'
            }
        ]
    }
];


// Pages proof
window.addEventListener('load', () => {

// Prüfung ob ACC eingeloggt ist FEHLT


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
    const selectedCategory = 'user';
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

// Quiz_Category Select Logic 
const li_items = quest_selection_list.querySelectorAll('li');

li_items.forEach(function(li, index){
    li.addEventListener('click', function(){
        switch(index){
            case 0:
                localStorage.setItem('selectedCategory', 'Natur');
                break;
            case 1:
                localStorage.setItem('selectedCategory', 'Technik');
                break;
            case 2:
                localStorage.setItem('selectedCategory', 'Mathe');
                break;
            case 3:
                localStorage.setItem('selectedCategory', 'Tiere');
                break;
            case 4:
                localStorage.setItem('selectedCategory', 'Musik');
                break;
            case 5:
                localStorage.setItem('selectedCategory', 'user');
                break;
        };
    });
});
    } else {

// --- QUEST_ANSWER site Logic --- //
const sache = localStorage.getItem('selectedCategory');
const userQuizData = JSON.parse(localStorage.getItem('userQuizData')) || [];
const selectedQuiz = quizData.find(quizData => quizData.category === sache);
const selected_user_quiz = userQuizData.find(userQuizData => userQuizData.category === sache);

let currentQuestionIndex = 0;
let currentQuiz = null;  // Variable, die das ausgewählte Quiz speichert
let quiz_punkte = 0;

// Funktion zum Laden der aktuellen Frage
function loadQuestion(quiz) {
    const questionTextElement = document.getElementById('questionText');
    const answerContainer = document.querySelector('.answer-container');
    
    // Fragen und Antworten aus dem aktuellen Quiz
    const currentQuestion = quiz.questions[currentQuestionIndex];

    // Fragetext aktualisieren
    questionTextElement.textContent = currentQuestion.question;

    // Antworten löschen, bevor neue Antworten hinzugefügt werden
    answerContainer.innerHTML = '';

    // Antworten dynamisch generieren
    let test = 0;
    currentQuestion.answers.forEach((answer, index) => {
        const answerLabel = document.createElement('label');
        const answerInput = document.createElement('input');

        // Antwortfeld konfigurieren
        answerInput.type = 'checkbox';
        answerInput.value = answer;
        answerInput.classList.add('answer-checkbox');

        answerLabel.classList.add('answer_label');
        answerLabel.classList.add(`answer_label_box${test}`);

        answerInput.addEventListener('click', () => {
            answerLabel.classList.toggle('active_answer');
        });

        answerLabel.appendChild(answerInput);
        answerLabel.appendChild(document.createTextNode(answer));

        answerContainer.appendChild(answerLabel);
        answerContainer.appendChild(document.createElement('br')); // Zeilenumbruch
        test++;
    });
}

// Funktion für den Next-Button
function nextButton_fc(quiz) {
    let clicked_answer = document.querySelectorAll('.active_answer input');

    // Überprüfen, ob eine Antwort ausgewählt wurde
    if (clicked_answer.length === 0) {
        alert('Bitte mindestens eine Antwort auswählen!');
        return;
    }

    // Aktuelle Frage holen
    const currentQuestion = quiz.questions[currentQuestionIndex];

    // Antwortüberprüfung
    if (clicked_answer.value === currentQuestion.correctAnswer || 
        clicked_answer.value === currentQuestion.correctAnswer[currentQuestionIndex]) {
        alert('Richtige Antwort!');
        quiz_punkte++;
    } else {
        alert(`Falsche Antwort! Die richtige Antwort wäre gewesen: ${currentQuestion.correctAnswer}`);
    }

    // Überprüfen, ob es weitere Fragen gibt + Ende und Abfrage für neues Spiel
    if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(quiz);
        document.getElementById('questionheadline').textContent = `Frage ${currentQuestionIndex + 1}/${quiz.questions.length}`;
    } else {
        function quiz_ending(){
            alert(`Das war die letzte Frage! \n Du hast: ${quiz_punkte} von ${quiz.questions.length} \n Richtig beantwortet!`);
            let again_frage = prompt(`Möchtest du nochmal ein Quiz Spielen? \n Tippe ein: Ja oder Nein`).toLowerCase();

            if(again_frage === 'ja'){
                window.location.href = "quiz_selection.html"; 
            } else if(again_frage === 'nein'){
                window.location.href = "index.html";
            } else {
                alert(`Entweder ja oder nein eintippen \n alles andere ist ungültig!`)
                quiz_ending();
            }
        };
        quiz_ending();
    };
};

// Überprüfen, welches Quiz geladen werden soll
if (selectedQuiz) {
    currentQuiz = selectedQuiz;
} else if (selected_user_quiz) {
    currentQuiz = selected_user_quiz;
} else {
    console.log("Keine Fragen für diese Kategorie gefunden.");
}

// Wenn ein Quiz gefunden wurde, initialisiere die Frage und den Next-Button
if (currentQuiz) {
    // Setze den Titel der ersten Frage
    document.getElementById('questionheadline').textContent = `Frage ${currentQuestionIndex + 1}/${currentQuiz.questions.length}`;

    // Lade die erste Frage
    loadQuestion(currentQuiz);

    // Nächste Frage beim Klicken auf den Button laden
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', () => {
        nextButton_fc(currentQuiz);
    });
}}});






