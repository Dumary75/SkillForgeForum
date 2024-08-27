"use strict"

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


// --- ACC_create site Logic --- //

let mainblocks_general =  document.querySelector('.main_blocks');
let mainblocks_innertext_default = document.querySelector('.main_blocks p');

// > Elements on create site //
let acc_create_field = document.querySelector('.acc_create');
let acc_create_form = document.querySelector('.acc_create_form');
// > Create Icons below //
let info_icon = document.querySelector('.pw_infos');
let info_box = document.querySelector('.info_box');
let info_checked_button = document.querySelector('.infos_checked_button');

let pw_generator_icon = document.querySelector('.pw_generator');
let pw_eye_icon = document.querySelector('.pw_auge');
let acc_create_form_button = document.querySelector('.form_create_button');

// Event to setup the create_site //
acc_create_field.addEventListener('click', () => {
       acc_login_field.style.display = 'none';
       mainblocks_innertext_default.textContent = '';
       acc_create_form.style.display = 'flex';
       acc_create_form_button.style.display = 'block';
       mainblocks_general.style.height = '21rem';
});

// Info_Icon Event //

info_icon.addEventListener('click', () => {
       main_container.classList.toggle('pressed_blurry_effect');
       footer.classList.toggle('pressed_blurry_effect');
       header_default.classList.toggle('pressed_blurry_effect');
       info_box.classList.toggle('info_box_active');
});

info_checked_button.addEventListener('click', () => {
       main_container.classList.toggle('pressed_blurry_effect');
       footer.classList.toggle('pressed_blurry_effect');
       header_default.classList.toggle('pressed_blurry_effect');
       info_box.classList.toggle('info_box_active');
});


// --- Elements on login site --- //
let acc_login_field = document.querySelector('.acc_login');



