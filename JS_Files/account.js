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


// ACC_create Logic //

let mainblocks_general =  document.querySelector('.main_blocks');
let mainblocks_innertext_default = document.querySelector('.main_blocks p');

let acc_create_field = document.querySelector('.acc_create');
let acc_create_form = document.querySelector('.acc_create_form');
let acc_create_form_button = document.querySelector('.form_create_button');

let acc_login_field = document.querySelector('.acc_login');


acc_create_field.addEventListener('click', () => {
       acc_login_field.style.display = 'none';
       mainblocks_innertext_default.textContent = '';
       acc_create_form.style.display = 'flex';
       acc_create_form_button.style.display = 'block';
       mainblocks_general.style.height = '21rem';
});
