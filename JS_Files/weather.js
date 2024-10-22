"use strict"

// Check first if User is logged in //
let acc_token = JSON.parse(localStorage.getItem("loginToken"))

// --- Header Click Event --- //
let header_default = document.querySelector('header');
let main_container = document.querySelector('.main_container');
let header_blocks = document.querySelectorAll('.header_blocks_default');
let header_headline = document.querySelector('.header_headline');
let footer = document.querySelector('footer');

// > Account_current_state Logic < //  
let account_state = document.querySelector('.login_state');
let account_state_clicked = document.querySelector('.login_state_clicked');
let ausloggen = document.querySelector('.ausloggen');
let ausloggen_abrechen = document.querySelector('.abrechen');

let logged_site_blocker = document.querySelector('.login_checker');
let side_blocker_login = document.querySelector('.acc_login');
let side_blocker_create = document.querySelector('.acc_create');

window.addEventListener('load', () => {
    if(acc_token){
           account_state.classList.add('login_state_loggedIn');
           account_state.innerText = 'eingeloggt';

           header_headline.addEventListener('click', () => {
           header_default.classList.toggle('pressed');
           header_headline.classList.toggle('header_headline_pressed');
     
           header_blocks.forEach(header_block => {
                   header_block.classList.toggle('pressed_header_blocks');
            });
     
            main_blurry_effect();
        });

    } else {
     logged_site_blocker.classList.add('login_checker_active');
     side_blocker_login.addEventListener('click', () => {
        localStorage.setItem('loginCheckerToken', 'acc_login');
        window.location.href = 'account.html';
      });

      side_blocker_create.addEventListener('click', () => {
        localStorage.setItem('loginCheckerToken', 'acc_create');
        window.location.href = 'account.html';
      });

     header_blurr_effect();
     main_blurry_effect();
    };
});

// Blurry_Effects
function main_blurry_effect(){
        main_container.classList.toggle('pressed_blurry_effect');
        footer.classList.toggle('pressed_blurry_effect');  
};

function header_blurr_effect(){
    account_state_clicked.classList.toggle('login_state_clicked_active');
    header_blocks.forEach(header_block => {
    header_block.classList.toggle('pressed_blurry_effect'); });
    if(window.innerWidth <= 991){
        header_headline.classList.toggle('pressed_blurry_effect');
    };
};

account_state.addEventListener('click', () => {
            if(window.innerWidth > 991){
                header_blurr_effect();
                main_blurry_effect();
            } else {
                header_blurr_effect();
            };
     }); 

ausloggen.addEventListener('click', () => {
              localStorage.removeItem('loginToken');
              alert('Erfolgreich ausgeloggt!');
              window.location.reload()
   });       

ausloggen_abrechen.addEventListener('click', () => {
    if(window.innerWidth > 991){
        header_blurr_effect();
        main_blurry_effect();
        } else {
            header_blurr_effect();
    };                             
       });    

//-----------------------MAIN_CONTENT-------------------------------------------//

// > all Elements
                // Big_box //
let search_input = document.querySelector('.search input');
let search_button = document.querySelector('.search button');
let big_box_logo = document.querySelector('.big_box span');
let big_box_celcius = document.querySelector('.big_ceclius');
let big_box_weather_text = document.querySelector('.big_wetter_text');
let big_box_city = document.querySelector('.big_city');
let big_box_datum = document.querySelector('.big_datum');

                // Weather_big_data //
let url = 'https://api.weatherbit.io/v2.0/current';
let api_key = 'b71b8690ce644d4694d5f706ebb38609';

              // Weather_small_data //
let url_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily';


function check_search_input(){
        let search_input_value = search_input.value;
        if(search_input_value === ''){
            alert('Bitte zuerst etwas in der Suchleiste reinschreiben!')
        } else {
            let input_edited = search_input_value.toLowerCase().trim();
            let saved_weather = localStorage.getItem('weather_city') || [];
            if (saved_weather){
                localStorage.setItem('weather_city', input_edited);
            }
        };

        big_box_city.innerText = search_input_value;
        get_weather_data();
};

// Übersetzungsfunktion
function translateDescription(desc) {
       let translations = {
              "803": "Aufgelockerte Bewölkung",
              "800": "Klarer Himmel",
              "801": "Leicht bewölkt",
              "200": "Gewitter mit leichtem Regen",
              "201": "Gewitter mit Regen",
              "202": "Gewitter mit starkem Regen",
              "230": "Gewitter mit leichtem Nieselregen",
              "231": "Gewitter mit Nieselregen",
              "232": "Gewitter mit starkem Nieselregen",
              "233": "Gewitter mit Hagel",
              "300": "Leichter Nieselregen",
              "301": "Nieselregen",
              "302": "Starker Nieselregen",
              "500": "Leichter Regen",
              "501": "Mäßiger Regen",
              "502": "Starker Regen",
              "511": "Eisregen",
              "520": "Leichter Regenschauer",
              "521": "Regenschauer",
              "522": "Starker Regenschauer",
              "600": "Leichter Schnee",
              "601": "Schnee",
              "602": "Starker Schnee",
              "610": "Schneeregen",
              "611": "Schneeregen/Schneematsch",
              "612": "Starker Schneeregen/Schneematsch",
              "621": "Schneeschauer",
              "622": "Starker Schneeschauer",
              "623": "Schneetreiben",
              "700": "Nebel",
              "711": "Rauch",
              "721": "Dunst",
              "731": "Sand/Staub",
              "741": "Nebel",
              "751": "Gefrierender Nebel",
              "802": "Verstreute Wolken",
              "804": "Bedeckter Himmel",
              "900": "Unbekannte Niederschläge"
          };
       return translations[desc] || desc; // Fallback auf das Original, wenn keine Übersetzung existiert
   }

   // Weather_Icons
   function icon_select(code){
       let icons = {
              "200": "⛈️",
              "201": "⛈️",
              "202": "⛈️",
              "230": "⛈️",
              "231": "⛈️",
              "232": "⛈️",
              "233": "⛈️",
              "300": "🌧️",
              "301": "🌧️",
              "302": "🌧️",
              "500": "🌧️",
              "501": "🌧️",
              "502": "🌧️",
              "511": "🌧️",
              "520": "🌧️",
              "521": "🌧️",
              "522": "🌧️",
              "600": "🌨️",
              "601": "🌨️",
              "602": "🌨️",
              "610": "🌨️",
              "611": "🌧️",
              "612": "🌧️",
              "621": "🌨️",
              "622": "❄️",
              "623": "❄️",
              "700": "🌫️",
              "711": "🌫️",
              "721": "🌫️",
              "731": "🌫️",
              "741": "🌫️",
              "751": "🌫️",
              "800": "☀️",
              "801": "🌤️",
              "802": "⛅️",
              "803": "🌥️",
              "804": "☁️",
              "900": "🌧️"
       };
       return icons[code];
   };

   // Monat / Tag zuordenen und in String umwandeln
   function switch_mounth_dynamic(mounths){
    switch(mounths){
        case 1:
        return "Januar"
    
        case 2:
        return "Februar"
    
        case 3:
        return "März"

        case 4:
        return "April"
    
        case 5:
        return "Mai"
    
        case 6:
        return "Juni"
    
        case 7:
        return "Juli"

        case 8:
        return "August"

        case 9:
        return "September"

        case 10: 
        return "Oktober"

        case 11:
        return "November"

        case 12:
        return "Dezember"
    };
};

function switch_day_dynamic(days){
    let wochenTag = days % 7;

    switch(wochenTag){
        case 1:
        return "MO"
    
        case 2:
        return "DIE"
    
        case 3:
        return "MI"

        case 4:
        return "DO"
    
        case 5:
        return "FR"
    
        case 6:
        return "SA"
    
        case 0:
        return "SO"
    };
};

let aufruf = 0;
function get_weather_data(){
    let current_city = localStorage.getItem('weather_city');

    let activ_url = `${url}?city=${current_city}&country=DE&key=${api_key}`
    let active_forecast_url = `${url_forecast}?city=${current_city}&country=DE&key=${api_key}`

                  // Small_box //
    let small_boxes_container = document.querySelector('.small_box_container');

    // Dayli Weather Data //
    fetch(activ_url)
     .then(response => response.json())
     .then(data => {

       big_box_logo.innerText = icon_select(data.data[0].weather.code);

        let new_temp = (data.data[0].temp);
        big_box_celcius.innerText = `${new_temp} Cº`

        big_box_weather_text.innerText = translateDescription(data.data[0].weather.code);

        let date = (data.data[0].ob_time);
        // Splitte das Datum und die Uhrzeit
        let [datePart, timePart] = date.split(" ");
        
        // Splitte das Datum in Jahr, Monat, Tag
        let [year, month, day] = datePart.split("-");
        
        // Drehe die Reihenfolge und füge Punkte hinzu
        let formattedDate = `${day}.${month}.${year}`;
        
        // Verknüpfe das formatierte Datum mit der Uhrzeit
        let finalDate = `${formattedDate} ${timePart}`;
        big_box_datum.innerText = finalDate;

     })
     .catch(error => console.error('Fehler!', error));

     // Forecast Weather Data //
     fetch(active_forecast_url)
     .then(response => response.json())
     .then(data => {
        small_boxes_container.innerHTML = '';
        for(let i=1; i<4; i++){
            // Boxen
            let small_box = document.createElement('div');
            small_box.classList.add('testklasse');
        
            // Symbol
            let weather_symbol = document.createElement('span');
            weather_symbol.innerText = icon_select(data.data[i].weather.code);
        
            // Min / Max Temp
            let min_temp = data.data[i].min_temp;
            let max_temp = data.data[i].max_temp;
            let temp_text = document.createElement('p');
            temp_text.innerText = ` ${min_temp} /  ${max_temp}`;

            // Datum vor WochenTag
            let heute = new Date();

            let mounth = heute.getMonth() + 1;
            let mounth_ausgabe = switch_mounth_dynamic(mounth);

            let DatumTag = heute.getDate() + i;
        
            let datum_text = document.createElement('p');
            datum_text.innerText = `${DatumTag} ${mounth_ausgabe}`

            // Wochentag
            let heute_tag = heute.getDay();
            let WochenTag = document.createElement('p');
            WochenTag.innerText = switch_day_dynamic(heute_tag + i);
            
            // Zum DOM Hinzufügen
            small_box.appendChild(weather_symbol);
            small_box.appendChild(temp_text);
            small_box.appendChild(datum_text);
            small_box.appendChild(WochenTag);
            small_boxes_container.appendChild(small_box);
            aufruf++;
            };
     })
     .catch(error => console.error('Fehler!', error));
};



search_button.addEventListener('click', check_search_input);