let slideIndex = 1;
let slideTimer; // Переменная для хранения таймера

function showSlides(n) {
    clearTimeout(slideTimer); // Очистить предыдущий таймер перед показом нового слайда

    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n) {
        slideIndex = n;
    }

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Перезапускать таймер после показа нового слайда
    slideTimer = setTimeout(function () {
        slideIndex++;
        showSlides(); // Показать следующий слайд после задержки
    }, 5000); // Изменение слайда каждые 5 секунд
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

// Вызываем функцию showSlides для автоматического переключения слайдов
showSlides(slideIndex);
