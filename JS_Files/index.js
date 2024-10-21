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


window.addEventListener('load', () => {
       header_headline.addEventListener('click', () => {
              header_default.classList.toggle('pressed');
              header_headline.classList.toggle('header_headline_pressed');
        
              header_blocks.forEach(header_block => {
                      header_block.classList.toggle('pressed_header_blocks');
               });
        
               main_blurry_effect();
           });

       if(acc_token){
              account_state.classList.add('login_state_loggedIn');
              account_state.innerText = 'eingeloggt';
              } else {
                  ausloggen.innerText = 'einloggen';
                  ausloggen.style.backgroundColor = '#51c151';
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
              if(acc_token){
                     localStorage.removeItem('loginToken');
                     alert('Erfolgreich ausgeloggt!');
                     window.location.reload()
              } else {
                     alert('Sie werden zur Login Seite weitergeleitet!')
                     window.location.href = 'account.html';
              };
   });       

ausloggen_abrechen.addEventListener('click', () => {
    if(window.innerWidth > 991){
        header_blurr_effect();
        main_blurry_effect();
        } else {
            header_blurr_effect();
    };                             
       });   