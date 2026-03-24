document.addEventListener("DOMContentLoaded", () => {

let index = 0;

const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const slider = document.querySelector(".hero");

// अगर element नहीं मिला तो stop
if(!slides || !dotsContainer || !slider){
  console.log("Slider elements not found");
  return;
}

const totalSlides = slides.children.length;

// CREATE DOTS
for(let i=0;i<totalSlides;i++){
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.onclick = ()=> goToSlide(i);
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateSlider(){
  if(index >= totalSlides) index = 0;
  if(index < 0) index = totalSlides - 1;
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// NEXT
window.nextSlide = function(){
  index = (index + 1) % totalSlides;
  updateSlider();
}

// PREVIOUS
window.prevSlide = function(){
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// DOT CLICK
function goToSlide(i){
  index = i;
  updateSlider();
}

// AUTO SLIDE
let auto = setInterval(() => {
  index = (index + 1) % totalSlides;
  updateSlider();
}, 3000);

// PAUSE ON HOVER
slider.addEventListener("mouseover", ()=>{
  clearInterval(auto);
});

slider.addEventListener("mouseout", ()=>{
  auto = setInterval(() => {
    index = (index + 1) % totalSlides;
    updateSlider();
  }, 3000);
});

// BUTTON NAVIGATION
window.goProducts = function(){
  window.location.href = "products.html";
}

// INIT
updateSlider();

});