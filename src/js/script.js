'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.slider'),
          prev = document.querySelector('.slider__prev'),
          next = document.querySelector('.slider__next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          wraper = document.querySelector('.slider__wraper'),
          slidesField = document.querySelector('.slider__inner'),
          slides = document.querySelectorAll('.slider__item'),
          width = window.getComputedStyle(wraper).width;
    let slideIndex = 1;
    let offset = 0;

    function converType (string) {
        return +width.replace(/\D/g, '');
    }

    function getCurrentSlide () {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function setDotStyle () {
        dots.forEach(item => item.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    slidesField.style.display = 'flex';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.4s ease-in-out';
    wraper.style.overflow = 'hidden';

    const indicators = document.createElement('ul');
    const dots = [];
    indicators.classList.add('slider-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot);
        if (i === 0) {
            dot.style.opacity = 1;
        }
    }

    slides.forEach(item => {
        item.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    next.addEventListener('click', () => {
        if (offset == converType(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += converType(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
        slideIndex = 1;
        } else {
            slideIndex++;
        }

        getCurrentSlide();

        setDotStyle();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = converType(width) * (slides.length - 1);
        } else {
            offset -= converType(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        getCurrentSlide();

        setDotStyle();
    });

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = converType(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            getCurrentSlide();

            setDotStyle();
        });
    });

});