document.addEventListener('DOMContentLoaded', () => {
    const modalWindow = document.querySelector('.modal_window_request_a_call'),
          requestACall = document.querySelectorAll('.request_a_call'),
          closeBtn = document.querySelector('.close_btn'),
          faqQuestionOpenAndClose = document.querySelectorAll('.faq_question_aside'),
          arrowsDown = document.querySelectorAll('.arrow_down'),
          faqArticles = document.querySelectorAll('.faq_article'),
          faqAnswers = document.querySelectorAll('.faq_answer'),
          telInp = document.querySelector('.tel_inp'),
          burger = document.querySelector('.burger'),
          header = document.querySelector('.header'),
          showAllBtn = document.querySelector('.show_all_btn'),
          restDescOfProductWrapper = document.querySelector('.rest_desc_wrapper'),
          restDescOfProduct = document.querySelector('.rest_desc_of_product'),
          timeRadioInps = document.querySelectorAll('.modal_window_request_a_call input[type="radio"]'),
          exactTimeSelectWrapper = document.querySelector('.time_select_wrapper'),
          loadMoreBtn = document.querySelector('.show_more_btn'),
          callbackForm = document.getElementById('callbackForm'),
          privacyPolicyCheckbox = document.querySelector('.real_checkbox'),
          timeSelect = document.querySelector('.time_select');

    // Настройка маски ввода для поля телефонного номера
    const maskOptions = { mask: '+{7}(000)000-00-00' };
    const mask = IMask(telInp, maskOptions);

    // Функция для изменения стиля отображения элемента
    const toggleDisplay = (element, displayStyle) => {
        element.style.display = displayStyle;
    };

    // Функция для переключения класса у элемента
    const toggleClass = (element, className) => {
        element.classList.toggle(className);
    };

    // Функция для отображения или скрытия модального окна
    const handleModalWindow = (show) => {
        toggleDisplay(modalWindow, show ? 'flex' : 'none');
    };

    // Добавление события на кнопки "Запросить звонок" для открытия модального окна
    requestACall.forEach(el => {
        el.addEventListener('click', () => handleModalWindow(true));
    });

    // Добавление события на кнопку закрытия модального окна
    closeBtn.addEventListener('click', () => handleModalWindow(false));

    // Закрытие модального окна при клике вне его
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal_window_request_a_call')) {
            handleModalWindow(false);
        }
    });

    // Показ или скрытие выбора точного времени в зависимости от выбранного радио-кнопки
    timeRadioInps.forEach(radioInp => {
        radioInp.addEventListener('click', () => {
            toggleDisplay(exactTimeSelectWrapper, radioInp.value === 'Сейчас' ? 'none' : 'flex');
        });
    });

    // Открытие/закрытие меню при клике на бургер-меню
    burger.addEventListener('click', () => {
        toggleClass(header, 'open');
    });

    // Открытие/закрытие ответов на вопросы в разделе FAQ
    faqQuestionOpenAndClose.forEach((el, i) => {
        el.addEventListener('click', () => {
            const answerHeight = getComputedStyle(faqAnswers[i]).height;
            if (faqArticles[i].style.overflow === 'auto') {
                arrowsDown[i].classList.remove('active_arrow_down');
                faqArticles[i].style.height = '0';
                faqArticles[i].style.overflow = 'hidden';
            } else {
                arrowsDown[i].classList.add('active_arrow_down');
                faqArticles[i].style.height = answerHeight;
                faqArticles[i].style.overflow = 'auto';
            }
        });
    });

    // Обработка отправки формы обратного звонка
    callbackForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        const radioButtons = document.querySelectorAll('input[name="call_now"]');
        let selectedRadio = false;
        radioButtons.forEach(radioButton => {
            if (radioButton.checked) selectedRadio = true;
        });

        if (!selectedRadio || (radioButtons[1].checked && timeSelect.value === '') || !privacyPolicyCheckbox.checked) {
            if (!selectedRadio) alert('Пожалуйста, выберите предпочтительное время звонка.');
            else if (radioButtons[1].checked && timeSelect.value === '') alert('Пожалуйста, выберите точное время звонка.');
            if (!privacyPolicyCheckbox.checked) alert('Пожалуйста, примите условия политики защиты персональной информации.');
            return; // Прекращаем выполнение, если валидация не пройдена
        }

        // Если все условия выполнены, отправляем данные формы через fetch
        const formData = new FormData(callbackForm);
        fetch(callbackForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Форма успешно отправлена!');
                handleModalWindow(false);
                callbackForm.reset();
            } else {
                alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
        });
    });

    // Обработка кнопки "Показать полностью" для полного раскрытия описания продукта
    const handleShowAllBtn = () => {
        if (restDescOfProductWrapper.classList.contains('expanded')) {
            restDescOfProductWrapper.style.height = restDescOfProductWrapper.scrollHeight + 'px';
            requestAnimationFrame(() => {
                restDescOfProductWrapper.style.height = '0px';
                restDescOfProductWrapper.classList.remove('expanded');
            });
            showAllBtn.innerText = 'Показать полностью';
        } else {
            restDescOfProductWrapper.style.height = restDescOfProductWrapper.scrollHeight + 'px';
            restDescOfProductWrapper.classList.add('expanded');
            restDescOfProductWrapper.addEventListener('transitionend', () => {
                restDescOfProductWrapper.style.height = 'auto';
            }, { once: true });
            showAllBtn.innerText = 'Свернуть';
        }
    };

    // Добавление события на кнопку "Показать полностью"
    if (showAllBtn) {
        showAllBtn.addEventListener('click', handleShowAllBtn);
    }

    // Обновление доступности выбора времени звонка
    const updateAvailability = () => {
        const radioNow = document.querySelector('input.real_radio[name="call_now"][value="Сейчас"]');
        const radioExactTime = document.querySelector('input.real_radio[name="call_now"][value="Точное время"]');
        timeSelect.disabled = radioNow.checked;

        radioNow.addEventListener('change', updateAvailability);
        radioExactTime.addEventListener('change', updateAvailability);
        timeSelect.addEventListener('change', () => {
            if (timeSelect.value) {
                radioExactTime.checked = true;
                radioNow.checked = false;
            }
        });
    };

    updateAvailability();

    // Обработка кнопки "Показать больше" для подгрузки дополнительных товаров
    if (loadMoreBtn) {
        let nextPage = 2;
        loadMoreBtn.addEventListener('click', () => {
            fetch(`/ajax/tovari/${categorySlug}/?page=${nextPage}`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.non_prescription_section').insertAdjacentHTML('beforeend', data.content);
                    if (!data.has_next) {
                        loadMoreBtn.remove();
                    } else {
                        nextPage++;
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }
});