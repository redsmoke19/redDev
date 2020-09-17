(function() {
  // Sandwich
  const getSandwichToggle = function() {
    const ENTER_BUTTON = 13;
    let sandwich = document.querySelector('.sandwich');
    let mainNav = document.querySelector('.main-nav');
    let navItems = Array.from(document.querySelectorAll('.main-nav__item'));
    console.log(document.body);

    function toggleLink(item) {
      item.classList.toggle('main-nav__item--open');
    }

    function sandwichOpen() {
      sandwich.classList.toggle('sandwich-open');
      mainNav.classList.toggle('main-nav--open');
      document.body.classList.toggle('overflow-hidden');
      navItems.forEach((item, i) => {
        setTimeout(() => {
          toggleLink(item);
        }, 150 * ++i);
      });
    }

    sandwich.addEventListener('click', sandwichOpen);
    sandwich.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER_BUTTON) {
        sandwichOpen();
      }
    });
  };
  // Portfolio modal
  const getPortfolioModal = function() {
    let modal = document.querySelector('.modal-works');
    let modalClose = document.querySelector('.modal-works__icon--close');
    let previewsPicture = document.querySelectorAll('.works__item');

    previewsPicture.forEach(item => {
      item.addEventListener('click', () => {
        modal.classList.add('modal-works--open');
        document.body.classList.add('overflow-hidden');
      });
    });

    const getModalClose = function() {
      modal.classList.remove('modal-works--open');
      document.body.classList.remove('overflow-hidden');
    };

    modalClose.addEventListener('click', getModalClose);
    // modal.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('modal-works')) {
    //     getModalClose();
    //   }
    // });
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        getModalClose();
      }
    });
  };
  getSandwichToggle();
  getPortfolioModal();
})();
