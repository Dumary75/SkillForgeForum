"use strict"

// Check first if User is logged in / clicked on login_checker by other site //
let acc_token = JSON.parse(localStorage.getItem("loginToken"))
let login_checker_token = localStorage.getItem("loginCheckerToken");

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

       if(login_checker_token){
              if(login_checker_token === 'acc_create'){
                     field_display_logic(acc_login_field,acc_create_field,acc_create_formular,acc_create_formular_button);
                     localStorage.removeItem('loginCheckerToken');
                  } else {
                     field_display_logic(acc_create_field,acc_login_field,acc_login_form,form_login_button);
                     localStorage.removeItem('loginCheckerToken');
                  }
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
                     alert('Ab gehts zur Login Seite!');
                     localStorage.setItem('loginCheckerToken', 'acc_login');
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

//-----------------------MAIN_CONTENT-------------------------------------------//

// Acc_CREATE site Logic //
let acc_create_field = document.querySelector('.acc_create');
let acc_create_formular = document.querySelector('.acc_create_form');

// > Create Icons below //
let info_icon = document.querySelector('.pw_infos');
let info_box = document.querySelector('.info_box');
let info_checked_button = document.querySelector('.infos_checked_button');

let pw_generator_icon = document.querySelector('.pw_generator');
let pw_eye_icon = document.querySelector('.pw_auge');

acc_create_field.addEventListener('click', () => {
       field_display_logic(acc_login_field,acc_create_field,acc_create_formular,acc_create_formular_button)
});

// Acc_LOGIN site Logic //
let acc_login_field = document.querySelector('.acc_login');
let acc_login_form = document.querySelector('.acc_login_form');
let form_login_button = document.querySelector('.form_login_button');
let pw_auge_login = document.querySelector('.pw_auge_login');

acc_login_field.addEventListener('click', () => {
       field_display_logic(acc_create_field,acc_login_field,acc_login_form,form_login_button)
});

function field_display_logic(field_remove,current_field,current_form,form_button){
       field_remove.style.display = 'none';
       let pElement = current_field.querySelector('p');
       pElement.textContent = ''; 

       current_form.style.display = 'flex';
       form_button.style.display = 'block';

       current_field.classList.add('mainblocks_responsive');
       if(current_field === acc_login_field){
          document.querySelector('.mainblocks_responsive').style.backgroundColor = '#10a2f2';
          current_field.classList.remove('acc_login');
       } else {
          document.querySelector('.mainblocks_responsive').style.backgroundColor = '#066f8b';
          current_field.classList.remove('acc_create');

       }
       current_field.classList.remove('hover_effect');
};

//-----------------------------------------------------------------------//

// --- ICONS --- //
// Info_Icon Event 

info_icon.addEventListener('click', () => {
       info_icon_logic();
});

info_checked_button.addEventListener('click', () => {
       info_icon_logic();
});

function info_icon_logic(){
       main_container.classList.toggle('pressed_blurry_effect');
       footer.classList.toggle('pressed_blurry_effect');
       header_default.classList.toggle('pressed_blurry_effect');
       info_box.classList.toggle('info_box_active');
};

// PW Generator 
pw_generator_icon.addEventListener('click', () => {
       const length = 4; 
       const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
       let password = "";

            for (let i = 0, n = charset.length; i < length; ++i) {
                password += charset.charAt(Math.floor(Math.random() * n));
            }

       document.querySelector('#password').value = password;
});


// > Passwort (o) Eye < //
let klicked = 0;

// CREATE_page_version 
pw_eye_icon.addEventListener('click', () => {
       const password_input = document.querySelector('#password');
       const currentType = password_input.type;
       eye_icon_logic(password_input, currentType);
});

// LOGIN_page_version 
pw_auge_login.addEventListener('click', () => {
       const password_input_login = document.querySelector('#password_login');
       const currentType_login = password_input_login.type;
       eye_icon_logic(password_input_login,currentType_login)
});

function eye_icon_logic(password_input, currentType){

       password_input.type = currentType === "password" ? "text" : "password";

       if(klicked === 0){
              pw_eye_icon.textContent = '👁';
              klicked++;
              return;
       } else{
              pw_eye_icon.textContent = '👁‍🗨'
              klicked--;
              return;
       };
};

// > Account CREATE Button < //
let acc_create_formular_button = document.querySelector('.form_create_button');

acc_create_formular_button.addEventListener('click', (event) => {

       let username = document.querySelector('#name').value;
       let password = document.querySelector('#password').value; 

       if (!username || !password) {
              event.preventDefault();
              alert("Bitte Benutzername und Passwort eingeben.");
              return;
          } else {
              let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
              const newAccount = { username: username, password: password };
              accounts.push(newAccount);
              localStorage.setItem("accounts", JSON.stringify(accounts));
              alert("Account gespeichert!");
          }
});

// > Account LOGIN Button < //

let acc_login_form_button = document.querySelector('.form_login_button');

acc_login_form_button.addEventListener('click', (event) => {

       let username_login = document.querySelector('#name_login').value;
       let password_login = document.querySelector('#password_login').value; 

       if (!username_login || !password_login) {
              event.preventDefault();
              alert("Bitte Benutzername und Passwort eingeben.");
              return;
          } else {
              // check if the datas are correct 
              let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
              const account = accounts.find(account => account.username === username_login && account.password === password_login);
              if (account) {
                     // check if the login-token already exists
                     if (!isAlreadyLoggedIn(username_login)) {
                         alert('Login erfolgreich!');
                         setLoginToken(username_login);
                         return true;
                     } else {
                         event.preventDefault();
                         alert('Dieser Benutzer ist bereits eingeloggt.');
                         return false;
                     }
                 } else {
                     event.preventDefault();
                     alert('Login fehlgeschlagen: Benutzername oder Passwort ist falsch.');
                     return false;
                 }
          }
});

function isAlreadyLoggedIn(username_login) {
       const token = JSON.parse(localStorage.getItem('loginToken'));
       return token && token.username === username_login;
   };

// Account LOGIN-TOKEN logic 
function setLoginToken(username_login) {
       const token = {
              username: username_login,
       };
   
       localStorage.setItem('loginToken', JSON.stringify(token));
       console.log('Token gesetzt:', token);
   };



