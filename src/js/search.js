(()=>{
  const header = document.querySelector('.header__search')
  const search = header.querySelector('.search__btn')
  const phone = document.querySelector('.header__phone')
  const input = header.querySelector('.search__input')
  search.addEventListener('click', ()=> {
    toggleClass()
    if(!input.classList.contains('search__input--active')) input.value = ''
  })
  
  function toggleClass() {
    header.classList.toggle('header__search--active')
    search.classList.toggle('search__btn--active')
    input.classList.toggle('search__input--active')
    phone.classList.toggle('header__phone--hidden')
  }
      
  
  })();