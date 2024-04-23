const modalWindow = document.querySelector('.modal_window_request_a_call'),
      requestACall = document.querySelectorAll('.request_a_call'),
      closeBtn = document.querySelector('.close_btn'),
      faqQuestions = document.querySelectorAll('.faq_question'),
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
      exactTimeSelectWrapper = document.querySelector('.time_select_wrapper')

      const maskOptions = {
        mask: '+{7}(000)000-00-00'
      }

      const mask = IMask(telInp, maskOptions)



      requestACall.forEach((el)=>{
        el.addEventListener('click',()=>{
            modalWindow.style.display = 'flex'
        })
        
      })

    
closeBtn.addEventListener('click',()=>{
    modalWindow.style.display = 'none'
})


document.addEventListener('click',(e)=>{
    let self = e.target

    if(self.className == 'modal_window_request_a_call'){
        modalWindow.style.display = 'none'
    }
})

timeRadioInps.forEach((radioInp) =>{


    radioInp.addEventListener('click',()=>{
        if(radioInp.value == 'Сейчас'){
            exactTimeSelectWrapper.style.display = 'none'
        }

        else{
            exactTimeSelectWrapper.style.display = 'flex'
        }
    })

})


burger.addEventListener('click',()=>{
    header.classList.toggle('open')
})



let answerHeight;

for (let i = 0; i < faqQuestionOpenAndClose.length; i++) {
    faqQuestionOpenAndClose[i].addEventListener('click', () => {
        const allStyles = getComputedStyle(faqAnswers[i]);
        answerHeight = allStyles.height;

        if (faqArticles[i].style.overflow === 'auto') {
            arrowsDown[i].classList.remove('active_arrow_down');
            faqArticles[i].style.height = 0;
            faqArticles[i].style.overflow = 'hidden';
        } else {
            arrowsDown[i].classList.add('active_arrow_down');
            faqArticles[i].style.height = answerHeight;
            faqArticles[i].style.overflow = 'auto';
        }
    });
}


showAllBtn.addEventListener('click',()=>{
    const allStyles = getComputedStyle(restDescOfProduct)
    const height = allStyles.height

    restDescOfProductWrapper.style.height = height
    restDescOfProductWrapper.style.overflow = 'auto'
    showAllBtn.innerText = 'Свернуть'

    showAllBtn.addEventListener('click',()=>{
        if( restDescOfProductWrapper.style.overflow == 'auto'){
            restDescOfProductWrapper.style.height = 0
            restDescOfProductWrapper.style.overflow = 'hidden'
            showAllBtn.innerText = 'Показать полностью'
        }

        else{
            restDescOfProductWrapper.style.height = height
            restDescOfProductWrapper.style.overflow = 'auto'
            showAllBtn.innerText = 'Свернуть'
        }
    })
})
document.addEventListener('DOMContentLoaded', function() {
    const radioNow = document.querySelector('input.real_radio[name="call_now"][value="Сейчас"]');
    const radioExactTime = document.querySelector('input.real_radio[name="call_now"][value="Точное время"]');
    const timeSelect = document.querySelector('.time_select');

    function updateAvailability() {
        timeSelect.disabled = radioNow.checked;
    }

    radioNow.addEventListener('change', updateAvailability);
    radioExactTime.addEventListener('change', updateAvailability);

    timeSelect.addEventListener('change', function() {
        if (timeSelect.value) {
            radioExactTime.checked = true;
            radioNow.checked = false;
        }
    });

    updateAvailability();
});
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".request_a_call_form");
    var checkbox = document.querySelector(".real_checkbox");

    form.addEventListener("submit", function(event) {
        if (!checkbox.checked) {
            alert("Пожалуйста, примите условия политики конфиденциальности.");
            event.preventDefault(); // Отменяем отправку формы
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.show_more_btn');
    if (loadMoreBtn) {
        let nextPage = 2;
        loadMoreBtn.addEventListener('click', function() {
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
// showAllBtn.addEventListener('click',()=>{
//     restDescOfProduct.style.display = 'block'
//     showAllBtn.innerHTML = 'Свернуть'

//     showAllBtn.addEventListener('click',()=>{
//         if(restDescOfProduct.style.display == 'block'){
//             restDescOfProduct.style.display = 'none'
//             showAllBtn.innerHTML = 'Показать все'
//         }

//         else{
//             restDescOfProduct.style.display = 'block'
//             showAllBtn.innerHTML = 'Свернуть'
        
//         }
//     })
// })
