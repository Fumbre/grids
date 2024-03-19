(()=>{
  const buttonList = document.querySelector('.project__button-list');

  [...buttonList.children].forEach((item, index)=>{
    index++
    [...item.children].forEach((btn)=>{
      btn.addEventListener('click',  ()=>{
        btnToggle(btn)
        contentToggle(index)
      })
    })
  })

  function btnToggle(item) {
    buttonList.querySelector('.project__btn--active').classList.remove('project__btn--active');
    item.classList.add('project__btn--active');
  }

  function contentToggle(index) {
    buttonList.parentElement.querySelector('.project__content').classList = `project__content project__content${index}`;
  }

})();
