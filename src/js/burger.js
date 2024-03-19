(()=>{
  const button = document.querySelector('.menu__btn')
  const menuList = document.querySelector('.menu__list')
  const phone = document.querySelector('.header__phone')

  button.addEventListener('click', ()=> {
    toggleClass()
  })

  menuList.childNodes.forEach(item => {
    item.addEventListener('click', ()=> toggleClass())
  })

  function toggleClass() {
    button.classList.toggle('menu__btn--active')
    menuList.classList.toggle('menu__list--active')
    phone.classList.toggle('header__phone--active')
  }
    

})();