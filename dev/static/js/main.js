(function() {
  // Sandwich
  const getSandwichToggle = function() {
    const ENTER_BUTTON = 13;
    const sandwich = document.querySelector('.sandwich');

    function sandwichOpen() {
      sandwich.classList.toggle('sandwich-open');
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