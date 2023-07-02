'use strict'

const passOut = document.querySelector('.pass-out'),
  copyIcon = document.querySelector('.material-icons'),
  length = document.querySelector('.length'),
  inputLength = document.querySelector('.inputLength'),
  passIndicator = document.querySelector('.pass-indicator'),
  btnGen = document.querySelector('.gen-btn'),
  check = document.querySelectorAll('.check input');


const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}



const generatePassword = () => {
  let staticPassword = "",
  randomPassword = "",
  excludeDuplicate = false,
  passLength = inputLength.value;
  check.forEach(option => { // пробегаем по  checkbox
    if(option.checked) { // если поставлена галочка
      if(option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if(option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else { 
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    // берем случайное значение из переменной
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
     if(excludeDuplicate) { // если повторения не разрешены
        // если пароль еще не содержит новый элемент 
        // или новый элемент является "  ", то то элемент добаляется к паролю
        !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
     } else { // добаляем каждый элемент
        randomPassword += randomChar;
    }
  }
  passOut.value = randomPassword; // выводим пароль на экран
}


const upadatePassIndicator = () => {
  // если длина пароля до 8 символов, то индикатор красный, если до 16 символов - желтый
  // если в пароле больше 16 символов, то индикатор зеленый
  (inputLength.value <= 8) ? passIndicator.style.background = '#F50109' : (inputLength.value <= 16) ? passIndicator.style.background = '#F5CB15' : passIndicator.style.background = '#1FF500'
}


const updateSlider = () => {
  // передаем значение ползунка 
  length.innerText = inputLength.value;
  generatePassword();
  upadatePassIndicator();
}

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passOut.value); // копируем пароль
  copyIcon.innerText = "thumb_up"; 
  copyIcon.style.color = "#4285F4";
  setTimeout(() => { // через 1с вернется значок "копировать"
      copyIcon.innerText = "copy_all";
      copyIcon.style.color = "#707070";
  }, 1000);
}


copyIcon.addEventListener("click", copyPassword);
inputLength.addEventListener("input", updateSlider);
btnGen.addEventListener("click", generatePassword);