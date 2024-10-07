"use strict"

 // > Account_current_state Logic //  
 let account_state = document.querySelector('.login_state');
 window.addEventListener('load', () => {
       let acc_token = JSON.parse(localStorage.getItem("loginToken"))
       if(acc_token){
        account_state.classList.add('login_state_loggedIn');
         account_state.innerText = 'eingeloggt';    
       };
 });

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


   