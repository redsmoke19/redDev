'use strict';
(function() {
  let ENTER__CODE = 13;
  let ESC_CODE = 27;
  // Sandwich
  const getSandwichToggle = function() {
    let sandwich = document.querySelector('.sandwich');
    window.mainNav = document.querySelector('.main-nav');
    let navItems = Array.from(document.querySelectorAll('.main-nav__item'));
    console.log(document.body);

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
  // Portfolio modal
  const getPortfolioModal = function() {
    if (document.body.classList.contains('portfolio-page')) {
      let modal = document.querySelector('.modal-works');
      let modalClose = document.querySelector('.modal-works__button');
      let previewsPicture = document.querySelectorAll('.works__item');
      let modalTitle = document.querySelector('.modal-works__title');
      let modalImage = document.querySelector('.modal-works__photo');
      let modalProjectName = document.querySelector('.js-project-name');
      let modalLink = document.querySelector('.js-project-site');
      let modalClient = document.querySelector('.js-project-client');
      let overlay = document.querySelector('.overlay');

      previewsPicture.forEach((item) => {
        item.addEventListener('click', () => {
          getModalOpen(item);
        });
        item.addEventListener('keydown', (e) => {
          if (e.keyCode === ENTER__CODE) {
            getModalOpen(item);
          }
        });
      });

      let getModalOpen = function(item) {
        let itemImage = item.querySelector('.works__photo');
        modalTitle.textContent = itemImage.alt;
        modalProjectName.textContent = ' ' + itemImage.alt;
        modalImage.src = itemImage.src;
        modalImage.srcset = itemImage.srcset;
        modalImage.alt = itemImage.alt;
        modalLink.textContent = itemImage.dataset.modalSite;
        modalLink.href = itemImage.dataset.modalHref;
        modalClient.textContent = ' ' + itemImage.dataset.modalClient;

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
        console.log(mainNav);
      }
    }
  })();

  getSandwichToggle();
  getPortfolioModal();
  getCircleSize();
})();
