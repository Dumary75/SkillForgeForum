"use strict"

// Check first if User is logged in //
let acc_token = JSON.parse(localStorage.getItem("loginToken"))

// --- Header Click Event --- //

let header_default = document.querySelector('header');
let main_container = document.querySelector('.main_container');
let main_container_game = document.querySelector('.main_container_game');
let header_blocks = document.querySelectorAll('.header_blocks_default');
let header_headline = document.querySelector('.header_headline');
let footer = document.querySelector('footer');

if(acc_token){
    header_headline.addEventListener('click', () => {
        header_default.classList.toggle('pressed');
        header_headline.classList.toggle('header_headline_pressed');
 
        header_blocks.forEach(header_block => {
               header_block.classList.toggle('pressed_header_blocks');
        });
 
        if(main_container_game){
            main_container_game.classList.toggle('pressed_blurry_effect');
        } else if(main_container){
            main_container.classList.toggle('pressed_blurry_effect');
        };

        footer.classList.toggle('pressed_blurry_effect');
    });
}

// > Account_current_state Logic < //  

let account_state = document.querySelector('.login_state');
let account_state_clicked = document.querySelector('.login_state_clicked');
let ausloggen = document.querySelector('.ausloggen');
let ausloggen_abrechen = document.querySelector('.abrechen');

let logged_site_blocker = document.querySelector('.login_checker');
let logged_site_blocker_boxes = document.querySelectorAll('.login_checker_boxes');

window.addEventListener('load', () => {
       if(acc_token){
              account_state.classList.add('login_state_loggedIn');
              account_state.innerText = 'eingeloggt';
       } else {
        logged_site_blocker.classList.add('login_checker_active');
        header_headline.classList.add('pressed_blurry_effect');
        main_container.classList.add('pressed_blurry_effect');
        logged_site_blocker_boxes.forEach(box => {
            box.addEventListener('click', () => {
                window.location.href = 'account.html';
            });
        });
       };
});
 

account_state.addEventListener('click', () => {
              account_state_clicked.classList.toggle('login_state_clicked_active');
              header_headline.classList.toggle('pressed_blurry_effect');
              header_blocks.forEach(header_block => {
              header_block.classList.toggle('pressed_blurry_effect'); });     
              if(main_container_game){
                main_container_game.classList.toggle('pressed_blurry_effect');
            } else if(main_container){
                main_container.classList.toggle('pressed_blurry_effect');
            };
            footer.classList.toggle('pressed_blurry_effect');
                                    
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
                                                 if(main_container_game){
                                                    main_container_game.classList.toggle('pressed_blurry_effect');
                                                } else if(main_container){
                                                    main_container.classList.toggle('pressed_blurry_effect');
                                                };
              footer.classList.toggle('pressed_blurry_effect');
                                        
       });        
