"use strict"

"use strict"

// Header Click Event //

let header_default = document.querySelector('header');
let main_blocks = document.querySelectorAll('.main_blocks');
let header_blocks = document.querySelectorAll('.header_blocks_default');
let header_headline = document.querySelector('.header_headline');
let footer = document.querySelector('footer');

header_headline.addEventListener('click', () => {
       header_default.classList.toggle('pressed');
       header_headline.classList.toggle('header_headline_pressed');

       header_blocks.forEach(header_block => {
              header_block.classList.toggle('pressed_header_blocks');
       });

       main_blocks.forEach(main_block => {
              main_block.classList.toggle('pressed_blurry_effect');
       });
       
       // footer.classList.toggle('pressed_blurry_effect');
   });

// > Account_current_state Logic //  
let account_state = document.querySelector('.login_state');
let account_state_clicked = document.querySelector('.login_state_clicked');
let ausloggen = document.querySelector('.ausloggen');
let ausloggen_abrechen = document.querySelector('.abrechen');
let acc_token = JSON.parse(localStorage.getItem("loginToken"))

window.addEventListener('load', () => {
       if(acc_token){
              account_state.classList.add('login_state_loggedIn');
              account_state.innerText = 'eingeloggt';
       } else {
              ausloggen.innerText = 'einloggen';
              ausloggen.style.backgroundColor = '#0cb11a';
       }
});
 

account_state.addEventListener('click', () => {
              account_state_clicked.classList.toggle('login_state_clicked_active');
              header_headline.classList.toggle('pressed_blurry_effect');
              header_blocks.forEach(header_block => {
              header_block.classList.toggle('pressed_blurry_effect'); });                                       
       });

ausloggen.addEventListener('click', () => {
       let acc_token = JSON.parse(localStorage.getItem("loginToken"))
       if(acc_token){
              account_state.classList.remove('login_state_loggedIn');
              account_state.innerText = 'ausgeloggt'; 
              ausloggen.innerText = 'einloggen';
              ausloggen.style.backgroundColor = '#0cb11a';
              localStorage.removeItem('loginToken');
              alert('Erfolgreich ausgeloggt!');
              account_state_clicked.classList.remove('login_state_clicked_active');
              header_headline.classList.remove('pressed_blurry_effect');
              header_blocks.forEach(header_block => {
              header_block.classList.remove('pressed_blurry_effect'); });                              
       } else {
              window.location.href = 'account.html';
       };
   });       

ausloggen_abrechen.addEventListener('click', () => {
              account_state_clicked.classList.remove('login_state_clicked_active');
              header_headline.classList.remove('pressed_blurry_effect');
              header_blocks.forEach(header_block => {
              header_block.classList.remove('pressed_blurry_effect');
                                                 });
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

                // Weather_bit_data //
let url = 'https://api.weatherbit.io/v2.0/current';
let api_key = 'b71b8690ce644d4694d5f706ebb38609';

function check_search_input(){
        let search_input_value = search_input.value;
        if(search_input_value === ''){
            alert('Bitte zuerst etwas in der Suchleiste reinschreiben!')
        } else {
            let input_edited = search_input_value.toLowerCase().trim();
            let saved_weather = localStorage.getItem('weather_city') || [];
            if (saved_weather){
                localStorage.setItem('weather_city', JSON.stringify(input_edited));
            }
        };

        big_box_city.innerText = search_input_value;
        get_weather_data();
};


function get_weather_data(){
    let current_city = localStorage.getItem('weather_city').replace(/"/g, '');;

    let activ_url = `${url}?city=${current_city}&country=DE&key=${api_key}`

    fetch(activ_url)
     .then(response => response.json())
     .then(data => {
        let new_temp = (data.data[0].temp);
        big_box_celcius.innerText = `${new_temp} Cº`
        big_box_datum.innerText = (data.data[0].datetime);

     })
     .catch(error => console.error('Fehler!', error));

};


search_button.addEventListener('click', check_search_input);