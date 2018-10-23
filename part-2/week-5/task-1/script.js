'use strict';

// Код валидации формы
function validateForm(parameters) {

    /**
     * Валидируем строку по регулярному выражению.
     * Если шаблон не задан, то используется проверка на наличие 
     * в строке букв только русского и английского алфавита.
     * Если проверка прошла успешно, то возвращаем true, иначе false.
     * 
     * @param {String} value значение
     * @param {RegExp} pattern шаблон проверки (необязательный)
     */
    var isValidString = function (value, pattern) {
        if (!value) return true;
        var regExp = new RegExp(pattern || /^[а-яa-z]+$/i);
        return regExp.test(value);
    }

    /**
     * Валидируем строку на содержание только цифр.
     * Если дополнительно заданы параметры max и min,
     * то проверяем, что число входит в этот диапазон.
     * Если проверка прошла успешно, то возвращаем true, иначе false.
     * 
     * @param {String} value число в строковом представлении
     * @param {*} min минимальное значение числа (необязательный)
     * @param {*} max максимальное значение числа (необязательный)
     */
    var isValidNumber = function (value, min, max) {
        if (!value) return true;
        var intValue = parseInt(value);
        if (isNaN(intValue)) return false;
        if (min && parseInt(min) > value) return false;
        if (max && parseInt(max) < value) return false;
        return true;
    }

    /**
     * Валидируем элемент input по проверкам
     * data-required и data-validator.
     * Если проверка прошла успешно, то возвращаем true, иначе false.
     * 
     * @param {HTMLInputElement} input элемент ввода
     */
    var isInputValid = function (input) {
        if (input.dataset.hasOwnProperty('required') && !input.value) {
            return false;
        }
        if (input.dataset.hasOwnProperty('validator')) {
            switch (input.dataset.validator) {
                case 'letters':
                    return isValidString(input.value);
                case 'number':
                    return isValidNumber(input.value, input.dataset.validatorMin, input.dataset.validatorMax);
                case 'regexp':
                    return isValidString(input.value, input.dataset.validatorPattern);
                default:
                    return true;
            }
        }
    }

    var formElement = document.getElementById(parameters.formId);

    formElement.addEventListener('focus', function (event) {
        if (event.target.tagName === 'INPUT') {
            if (event.target.classList.contains(parameters.inputErrorClass)) {
                event.target.classList.remove(parameters.inputErrorClass);
            }
        }
    }, true);

    formElement.addEventListener('blur', function (event) {
        if (event.target.tagName === 'INPUT') {
            if (!isInputValid(event.target)) {
                event.target.classList.add(parameters.inputErrorClass);
            }
        }
    }, true);

    /**
     * Проверяем валидность формы.
     * Дополнительно обрамляем красной рамкой поля, не прошедшие проверку.
     * Если проверка прошла успешно, то возвращаем true, иначе false.
     */
    var isFormValid = function () {
        var inputs = document.querySelectorAll('#' + parameters.formId + ' input');
        var inputList = Array.prototype.slice.call(inputs);
        var isValid = true;
        inputList.forEach(function (input) {
            if (!isInputValid(input)) {
                isValid = false;
                input.classList.add(parameters.inputErrorClass);
            }
        });
        return isValid;
    }

    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        formElement.classList.remove(parameters.formInvalidClass, parameters.formValidClass);
        if (isFormValid()) {
            formElement.classList.add(parameters.formValidClass);
        } else {
            formElement.classList.add(parameters.formInvalidClass);
        }
    });
}