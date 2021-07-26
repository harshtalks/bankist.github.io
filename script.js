'use strict';

// Mobile Menu
const menuOpen = document.querySelector('.hamburger');
const menuClose = document.querySelector('.hamburger--close');
const menuItems = document.querySelectorAll('.nav__item');

menuOpen.addEventListener('click', function (e) {
  setTimeout(function () {
    e.preventDefault();
    menuOpen.style.display = 'none';
    menuItems.forEach(al => (al.style.display = 'block'));
  }, 250);
});

menuClose.addEventListener('click', function (e) {
  e.preventDefault();
  menuOpen.style.display = 'block';
  menuItems.forEach(al => (al.style.display = 'none'));
});

//Operation Tab
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(x => x.classList.remove('operations__tab--active'));
  tabsContent.forEach(x => x.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//header description button element effect

const buttonScrollTo = document.querySelector('.scroll__down');
const section1 = document.querySelector('.section--1');

buttonScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//fading Menu effect
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

//sticky NavBAr

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries) {
  const [e] = entries;
  if (!e.isIntersecting) {
    console.log('aa');
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const stickyObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

stickyObserver.observe(header);

const lazyload = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyload.forEach(img => imgObserver.observe(img));

//reveal Section LOl

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [e] = entries;
  if (!e.isIntersecting) return;
  e.target.classList.remove('section--hidden');
  console.log('aa');
  observer.unobserve(e.target);
};
const reveal = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  reveal.observe(section);
});

//menu navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Final Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curslide = 0;
const maxslide = slides.length;
btnRight.addEventListener('click', function (e) {
  if (curslide === maxslide - 1) {
    curslide = 0;
  } else curslide++;

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curslide)}%)`;
  });
});

//Initially

const init = function () {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
};

init();

btnLeft.addEventListener('click', function (e) {
  if (curslide === 0) {
    curslide = maxslide - 1;
  } else curslide--;

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curslide)}%)`;
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    if (curslide === 0) {
      curslide = maxslide - 1;
    } else curslide--;

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curslide)}%)`;
    });
  }
  if (e.key === 'ArrowRight') {
    if (curslide === maxslide - 1) {
      curslide = 0;
    } else curslide++;

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curslide)}%)`;
    });
  }
});

//modal box for us

const btnShow = document.querySelectorAll('.btn__show--modal');
const btnClose = document.querySelector('.close__modal');
const modal = document.querySelector('.modal__box');
const overlay = document.querySelector('.overlay');

btnShow.forEach(btn => {
  btn.addEventListener('click', function (e) {
    modal.style.transform = 'scale(1)';
    overlay.classList.remove('hide-this');
  });
});

btnClose.addEventListener('click', function (e) {
  modal.style.transform = 'scale(0)';
  overlay.classList.add('hide-this');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.style.transform = 'scale(0)';
    overlay.classList.add('hide-this');
  }
});

document.querySelector('.linkedPage').addEventListener('click', () => {
  window.open('https://harshtalks.github.io/bankapp.github.io/', '_blank');
});
