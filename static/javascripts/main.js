const header = document.querySelector('.main-header');
const body = document.body;
const burger = document.querySelector('#menu-btn');


burger.onclick = () => {
  header.classList.add('clicked');
}

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  if (scrollPos > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

function allowAni() {
  body.classList.add('loaded');
}