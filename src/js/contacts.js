(()=>{
  const btn = document.querySelector('.contacts-map__button')
  const container = document.querySelector('.contacts-map__info')


  btn.addEventListener('click', ()=> toggleClass())

  function toggleClass() {
    container.classList.toggle('contacts-map__info--hidden')
  }

})();