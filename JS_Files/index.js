"use strict"

// Header Click Event //

let header_default = document.querySelector('header');
let header_button = document.querySelector('header div');
let main_blocks = document.querySelectorAll('main div');

header_button.addEventListener('click', () => {
       header_default.classList.toggle('pressed');
       main_blocks.classList.toggle('pressed_div');
});