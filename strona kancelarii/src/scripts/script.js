const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");
const slides = document.querySelectorAll(".slider__slide");
let i = 0;

leftArrow.addEventListener('click', ()=>{
    slides[i].classList.toggle('active');
    i -= 1;
    if(i < 0) i = 2;
    slides[i].classList.toggle('active');
})

rightArrow.addEventListener('click', ()=>{
    slides[i].classList.toggle('active');
    i += 1;
    if(i > 2) i = 0;
    slides[i].classList.toggle('active');
})
