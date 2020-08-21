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
        console.log(i, ++i);
      });
    }

    sandwich.addEventListener('click', sandwichOpen);
    sandwich.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER_BUTTON) {
        sandwichOpen();
      }
    });
  };
  getSandwichToggle();
})();
