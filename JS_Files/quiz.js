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
let footer = document.querySelector('footer');

header_headline.addEventListener('click', () => {
       header_default.classList.toggle('pressed');
       header_headline.classList.toggle('header_headline_pressed');

       header_blocks.forEach(header_block => {
              header_block.classList.toggle('pressed_header_blocks');
       });

       main_container.classList.toggle('pressed_blurry_effect');
       footer.classList.toggle('pressed_blurry_effect');
   });



//-----------------------------------------------------------------------//