(function() {
  'use strict';

  const form = document.querySelector('.you-message__form');
  const formElems = document.querySelectorAll('.you-message__input');
  const formButton = document.querySelector('.you-message__button');

  const patternName = /^[а-яёА-ЯЁ\s]+$/;
  const patternMail = /^[A-Za-z0-9](([_.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
  const patternSpam = /[^<>\[\]%&'`]+$/;
  const errorMessage = [
    'Незаполненное поле ввода',
    'Введите Ваше реальное имя',
    'Укажите Вашу почту',
    'Неверный формат почты',
    'Укажите тему сообщения',
    'Напишите текст сообщения',
    'Уберите специальные символы'
  ];
  let isError = false;

  const getFormData = (form) => {
    // объект, куда будут записывать данные в формате 'имя_поля': 'значение'
    let controls = {};
    // если по какой-то причине в 'form' полей не нашлось вернём в функцию validForm пустое значение
    if (!form.elements) return '';
    for (let i = 0; i < form.elements.length; i++) {
      let element = form.elements[i];
      // т.к. имя поля находятся в верхнем регистре (так их записывает JS при создании объекта 'form'), переведём имя элемента в нижний регистр и проверим, не является ли текущий элемент кнопкой, значение которой нас не интересует
      if (element.tagName.toLowerCase() !== 'button') {
        controls[element.name] = element.value;
      }
    }
    return controls;
  };

  const getError = (formValidate, property) => {
    // создаём литеральный объект validate каждому свойству литерального объекта соответствует анонимная функция, в которой длина значения поля, у которого атрибут 'name' равен 'property', сравнивается с 0, а само значение - с соответствующим паттерном если сравнение истинно, то переменной error присваивается текст ошибки
    let error = '';
    let validate = {
      userName: function() {
        if (formValidate.userName.length === 0 || patternName.test(formValidate.userName) === false) {
          error = errorMessage[1];
        }
      },
      userMail: function() {
        if (formValidate.userMail.length === 0) {
          error = errorMessage[2];
        } else if (patternMail.test(formValidate.userMail) === false) {
          error = errorMessage[3];
        }
      },
      subject: function() {
        if (formValidate.subject.length === 0) {
          error = errorMessage[4];
        } else if (patternSpam.test(formValidate.subject) === false) {
          error = errorMessage[6];
        }
      },
      textMessage: function() {
        if (formValidate.textMessage.length === 0) {
          error = errorMessage[5];
        } else if (patternSpam.test(formValidate.textMessage) === false) {
          error = errorMessage[6];
        }
      }
    };
    // если после вызова анонимной функции validate[property]() переменной error было присвоено какое-то значение, то это значение и возвращаем в противном случае вернётся пустая строка, которая была присвоена изначально перед объявлением литерального объекта validate
    validate[property]();
    return error;
  };

  const showError = (property, error) => {
    let formElement = form.querySelector('[name=' + property + ']');
    let errorBox = formElement.nextElementSibling;
    formElement.classList.add('you-message__input--error');
    errorBox.innerHTML = error;
    errorBox.style.display = 'block';
    // let errorBox = document.createElement('span');
    // errorBox.classList.add('you-message__error');
    // errorBox.innerHTML = error;
    // formElement.parentNode.append(errorBox);
  };

  const clearError = (focusElement) => {
    let errorBox = focusElement.nextElementSibling;
    focusElement.classList.remove('you-message__input--error');
    errorBox.style.display = 'none';
    // errorBox.remove();
  };

  formElems.forEach(item => {
    item.addEventListener('blur', (e) => {
      let formElement = e.target;
      let property = formElement.getAttribute('name');
      let dataField = {};
      dataField[property] = formElement.value;
      let error = getError(dataField, property);
      if (error.length !== 0) {
        showError(property, error);
      }
      return false;
    });
  });

  const validForm = (e) => {
    e.preventDefault();
    let formValidate = getFormData(form);
    let error;
    for (let property in formValidate) {
      // здесь будем вызывать функцию, которая будет сравнивать значение свойства с паттерном RegExp и возвращать результат сравнения в виде пустой строки или текста ошибки валидации
      error = getError(formValidate, property);
      if (error.length !== 0) {
        // устанавливаем флаг ошибки
        isError = true;
        // вызываем функцию отображения текста ошибки
        showError(property, error);
      }
      ;
    }
    if (!isError) {
      // вызываем функцию отправляющую данные формы, хранящиеся в объекте formVal, на сервер
      sendFormData(formValidate);
    }
    return false;
  };

  const sendFormData = (formValidate) => {
    var xhr = new XMLHttpRequest();
    // формируем тело запроса, в котором указываем имена полей и их значения
    let body = '&userName=' + encodeURIComponent(formValidate.userName) +
      '&userMail=' + encodeURIComponent(formValidate.userMail) +
      '&subject=' + encodeURIComponent(formValidate.subject) +
      '&textMessage=' + encodeURIComponent(formValidate.textMessage);

    // указываем метод передачи данных, адрес php-скрипта, который эти данные
    // будет обрабатывать и способ отправки данных.
    // значение 'true' соответствует асинхронному запросу
    xhr.open('POST', 'send.php', true);
    // формируем HTTP-заголовки
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Cache-Control', 'no-cache');

    // отправляем тело запроса
    xhr.send(body);

    // XMLHttpRequest.onreadystatechange содержит обработчик события,
    // вызываемый когда происходит событие readystatechange
    xhr.onreadystatechange = function() {
      // данные на сервер отправлены удачно и получен от него положительный ответ
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // здесь расположен код вашей callback-функции
        // например, она может выводить сообщение об успешной отправке письма
        console.log('Отправлено');
      }
    };
  };

  form.addEventListener('focus', () => {
    let focusElement = document.activeElement;
    if (focusElement !== formButton) {
      clearError(focusElement);
    }
  }, true);
  formButton.addEventListener('click', validForm);
})();
