const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnOpenModal.length; i++)
// btnOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (x) {
  if (x.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scrollTo top
// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// const btnOpera = document.querySelector("a");
// const section2 = document.querySelector("#section--2");
// btnOpera.addEventListener("click", function (x) {
//   const s2coordds = section2.getBoundingClientRect();
//   //console.log(s2coordds);
//   // section2.scrollIntoView({ behavior: "smooth" });
// });

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  //   // console.log(s1coords);
  //   // window.scrollTo(
  //   //   s1coords.left + window.pageXOffset,
  //   //   s1coords.top + window.pageXOffset
  //   // );
  //   // to make it more smooth a prperty called behaviour
  //   // window.scrollTo({
  //   //   left: s1coords.left + window.pageXOffset,
  //   //   top: s1coords.top + window.pageXOffset,
  //   //   behavior: "smooth",
  //   // });
  //   //easy and modren way to do it
  section1.scrollIntoView({ behavior: 'smooth' });
});

//for all link to scroll
// document.querySelectorAll(".nav__link").forEach(function (el) {
// el.addEventListener("click", function (e) {
//   e.preventDefault();
//   const id = this.getAttribute("href");
//   console.log(id);
//   document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
// another means for the links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// const tabs = document.querySelectorAll(".operations__tab");
// const tabsContainer = document.querySelector(".operations__tab-container");
// const tabContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // a guard clause
  if (!clicked) return;
  // for one clicked to move up and the rest down ,also remove the two when clicked on one
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabContent.forEach((c) => c.classList.remove('operations__content--active'));
  //for one clicked to move up or activate tab
  clicked.classList.add('operations__tab--active');

  // activate content when clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation on th menu
// const nav = document.querySelector(".nav");
// nav.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const linkClicked = e.target;
//     const siblings = linkClicked.closest(".nav").querySelectorAll(".nav__link");
//     const logo = linkClicked.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== linkClicked) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const linkClicked = e.target;
//     const siblings = linkClicked.closest(".nav").querySelectorAll(".nav__link");
//     const logo = linkClicked.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== linkClicked) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
//modern way easy
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const linkClicked = e.target;
    const siblings = linkClicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = linkClicked.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== linkClicked) el.style.opacity = this; //opacity where this is because i use bind
    });
    logo.style.opacity = this; //opacity where this is because i use bind
  }
};
// nav.addEventListener("mouseover", function (x) {
//   handleHover(x, 0.5);
// });
// nav.addEventListener("mouseout", function (x) {
//   handleHover(x, 1);
// });
// another for this nav.event called bind
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky nav bar event
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > initialCords.top) nav.classList.add("sticky");
//   else {
//     nav.classList.remove("sticky");
//   }
// });
// another sticky example es6
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  //nav.classList.add("sticky");
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//*dom travsing */
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';
//h1.closest(".header").style.background = "var( --gradient-secondary)";
//h2.closest(".section").style.background = "var( --gradient-primary)";
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(1)';
});
// to insert text programmatically in dom or html
// const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//   'We use cookied for improved functionailty and analystics. <button class= "btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // first child on top of the header
// // header.append(message); // last child below the header

// //to add it in both side first and last child
// // header.append(message.cloneNode(true));
// // header.before(message);
// //header.after(message);

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 10 + "px";
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
// message.style.height = "100px";

//color changed in css root
//setting one property to affect others
document.documentElement.style.setProperty('--color-primary', 'orangered');

// // other event listener
// const h1 = document.querySelector("h1");
// // modern days
// // h1.addEventListener("mouseenter", function (e) {
// //   alert("All cookies done!!!");
// // });
// // olding days one
// // h1.onmouseenter = function (e) {
// //   alert("You are doing great!!");
// // };

// // to remove when it has listen first
// const alertH1 = function (e) {
//   alert(" this is great cookies !!!");
//   // h1.removeEventListener("mouseenter", alertH1);
// };
// h1.addEventListener("mouseenter", alertH1);
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// //getting random color and when clicking
// //rgb(255, 255, 255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   ` rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (y) {
//   this.style.backgroundColor = randomColor();
//   console.log("link", y.target, y.currentTarget);
//   console.log(y.currentTarget === this);

//   //to stop the two colors below
//   // y.stopImmediatePropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (y) {
//   this.style.backgroundColor = randomColor();
//   console.log("bet", y.target, y.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (y) {
//   this.style.backgroundColor = randomColor();
//   console.log("nav", y.target, y.currentTarget);
// });

// revealing sections animation section--hidden
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observes) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observes.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images animationa fliter
// const imgTargets = document.querySelectorAll("img[data-src]");

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   //replacing src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-img");
//   });

//   observer.unobserve(entry.target);
// };
// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   // rootMargin: "200px",
// });

// imgTargets.forEach((img) => imgObserver.observe(img));

//slider

let curSlide = 0;
const maxSlide = slides.length;

// to make the size small with the translateX
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";
//destructing//slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// repeat code , destructing
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// if (curSlide === maxSlide - 1) {
//   curSlide = 0;
// } else {
//   curSlide++;
// }
// goToSlide(curSlide);
// slides.forEach(
//   (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
// );

// btnLeft.addEventListener("click", function () {
//   curSlide--;

//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
//   );
// });

document.addEventListener('keydown', function (event) {
  if (event.key == 'ArrowLeft') prevSlide();

  event.key === 'ArrowRight' && nextSlide();
});

//dots slide
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
// to color the dot for current slide
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

//to leave the site
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = "";
// });
