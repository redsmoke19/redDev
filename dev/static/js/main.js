'use strict';
(function() {
  let ENTER__CODE = 13;
  let ESC_CODE = 27;
  // Sandwich
  const getSandwichToggle = function() {
    let sandwich = document.querySelector('.sandwich');
    window.mainNav = document.querySelector('.main-nav');
    let navItems = Array.from(document.querySelectorAll('.main-nav__item'));

    function toggleLink(item) {
      item.classList.toggle('main-nav__item--open');
    }

    window.sandwichOpen = function() {
      sandwich.classList.toggle('sandwich-open');
      window.mainNav.classList.toggle('main-nav--open');
      document.body.classList.toggle('overflow-hidden');
      navItems.forEach((item, i) => {
        setTimeout(() => {
          toggleLink(item);
        }, 150 * ++i);
      });
    };

    sandwich.addEventListener('click', window.sandwichOpen);
    sandwich.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER__CODE) {
        window.sandwichOpen();
      }
    });
  };
  // Skills circle resize
  const getCircleSize = function() {
    let circles = document.querySelectorAll('.skill__circle');
    circles.forEach(item => {
      if (window.matchMedia('(max-width: 767px').matches) {
        item.setAttribute('r', '43');
        item.setAttribute('cx', '48');
        item.setAttribute('cy', '48');
      }
      if (window.matchMedia('(min-width: 768px').matches) {
        item.setAttribute('r', '55');
        item.setAttribute('cx', '60');
        item.setAttribute('cy', '60');
      }
    });
  };
  // Resize Handler
  (function() {
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
        }, 66);
      }
    }

    function actualResizeHandler() {
      getCircleSize();
      let mainNav = document.querySelector('.main-nav');
      if (window.matchMedia('(min-width: 992px)').matches) {
        mainNav.style.transition = 'none';
        if (window.mainNav.classList.contains('main-nav--open')) {
          window.sandwichOpen();
        }
      }
      if (window.matchMedia('(max-width: 991px)').matches) {
        mainNav.style.transition = 'all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0)';
      }
    }
  })();
  // My works and modal
  const myWorks = function() {
    let works = [
      {
        name: 'Cat Energy',
        src: '../../../static/images/content/cat-energy1x.png',
        srcset: '../../../static/images/content/cat-energy2x.png 2x',
        description: 'Сайт для животных Cat Energy',
        link: 'https://redsmoke19.github.io/catcat/',
        client: 'HTMLAcademy (обучение)'
      },
      {
        name: 'Buy in Ciprus',
        src: '../../../static/images/content/cyprus1x.png',
        srcset: '../../../static/images/content/cyprus2x.png 2x',
        description: 'Недвижимость на Кипре',
        link: 'https://www.buyincyprus.ru',
        client: 'Nomia Dev'
      },
      {
        name: 'Buy in Ciprus',
        src: '../../../static/images/content/cyprus1x.png',
        srcset: '../../../static/images/content/cyprus2x.png 2x',
        description: 'Недвижимость на Кипре',
        link: 'https://www.buyincyprus.ru',
        client: 'Nomia Dev'
      }
    ];

    if (document.body.classList.contains('portfolio-page')) {
      let worksList = document.querySelector('.works__list');
      let template = document.querySelector('template').content;
      let fragment = document.createDocumentFragment();
      let templateItem = template.querySelector('.works__item');
      let modal = document.querySelector('.modal-works');
      let modalClose = document.querySelector('.modal-works__button');
      let modalTitle = document.querySelector('.modal-works__title');
      let modalImage = document.querySelector('.modal-works__photo');
      let modalProjectName = document.querySelector('.js-project-name');
      let modalLink = document.querySelector('.js-project-site');
      let modalClient = document.querySelector('.js-project-client');
      let overlay = document.querySelector('.overlay');

      let getWorksItem = function(arr) {
        let worksItem = templateItem.cloneNode(true);
        let worksPhoto = worksItem.querySelector('.works__photo');
        worksPhoto.src = arr.src;
        worksPhoto.srcset = arr.srcset;
        worksPhoto.alt = arr.description;
        return worksItem;
      };

      for (let i = 0; i < works.length; i++) {
        fragment.appendChild(getWorksItem(works[i]));
      }
      worksList.appendChild(fragment);

      let worksItem = document.querySelectorAll('.works__item');
      worksItem.forEach((item, index) => {
        item.addEventListener('click', () => {
          getModalOpen(works[index]);
        });
        item.addEventListener('keydown', (e) => {
          if (e.keyCode === ENTER__CODE) {
            getModalOpen(works[index]);
          }
        });
      });

      let getModalOpen = function(item) {
        modalTitle.textContent = item.description;
        modalProjectName.textContent = ' ' + item.description;
        modalImage.src = item.src;
        modalImage.srcset = item.srcset;
        modalImage.alt = item.alt;
        modalLink.textContent = item.name;
        modalLink.href = item.link;
        modalClient.textContent = ' ' + item.client;

        modal.classList.add('modal-works--open');
        document.body.classList.add('overflow-hidden');
        if (window.matchMedia('(min-width: 992px)').matches) {
          overlay.style.opacity = 1;
          overlay.style.pointerEvents = 'all';
        }
        modalClose.addEventListener('click', getModalClose);
        document.addEventListener('keydown', closeEcsModal);
        overlay.addEventListener('click', closeClickOverlay);
      };

      const getModalClose = function() {
        modal.classList.remove('modal-works--open');
        document.body.classList.remove('overflow-hidden');
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        document.removeEventListener('keydown', closeEcsModal);
        overlay.removeEventListener('click', closeClickOverlay);
        modalClose.removeEventListener('click', getModalClose);
      };

      const closeClickOverlay = (e) => {
        if (e.target.classList.contains('overlay')) {
          getModalClose();
        }
      };

      const closeEcsModal = (e) => {
        if (e.keyCode === ESC_CODE) {
          getModalClose();
        }
      };
    }
  };

  getSandwichToggle();
  getCircleSize();
  myWorks();
})();
