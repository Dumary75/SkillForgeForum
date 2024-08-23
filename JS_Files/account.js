"use strict"

// Header Click Event //

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

       main_container.classList.toggle('pressed_div');
       
       footer.classList.toggle('footer_pressed');
   });


// ACC CREATE LOGIC //

let acc_create_button = document.querySelector('.acc_create');
let acc_create_form = document.querySelector('.create_form');
let acc_login_button = document.querySelector('.acc_login');
let acc_innertext_default = document.querySelector('.main_blocks p');

acc_create_button.addEventListener('click', () => {
       acc_login_button.style.display = 'none';
       acc_innertext_default.textContent = '';
       acc_create_form.style.display = 'block';
});