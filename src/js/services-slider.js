(()=>{

  const services = document.getElementById('services')
  const options = document.querySelector('.services__options')

  function getIndex(){
    const element = options.querySelector('.services__option--active')
    const indexNumber = [...options.childNodes].indexOf(element)
    changeIndexToTranslate(indexNumber)
    setDisplayNone(indexNumber)
  }

  function changeIndexToTranslate(index){
    services.style.setProperty('--index', index)
  }

  function toAddClass(element) {
    options.childNodes.forEach(el =>{
      el.classList.remove('services__option--active')
    })
    element.classList.add('services__option--active')
    getIndex()
  }

  function setDisplayNone(indexOption) {
    const content = services.querySelector('.services__content')
    const array = [...content.children]
    array.forEach((element, indexContent) => {
      const isVisible = element.firstChild.classList.contains('services__item--active')
      const isClickedElement = indexOption === indexContent
      
      if(isClickedElement && !isVisible) {
        element.style.display = 'flex'
        element.childNodes.forEach((item, index) => {
          animation(item, 'services__item--active', ((index + 1) * 50))
        })
      } 
      if (!isClickedElement) {
        element.childNodes.forEach((item, index) => {
          animation(item, 'services__item--active', (index + 1) * 50, true)
        })
        element.style.display = 'none'
      }
    })
  }

  function animation(element, className, milisec, removeClassName = false) {
    let timeStart = null
    let animeRun = false 

    function anime(timeStap) {
      if(!timeStart) timeStart = timeStap

      const what = timeStap - timeStart 

      if( what >= milisec && !removeClassName) {
        element.classList.add(className)
        animeRun = false
      }
      if(removeClassName){
        element.classList.remove(className)
        animeRun = false
      }

      if (animeRun) requestAnimationFrame(anime)
    }
    requestAnimationFrame(anime)
    animeRun = true
  }

  setDisplayNone(0)

  options.childNodes.forEach(element => {
    element.addEventListener('click', (event)=>{
      toAddClass(event.currentTarget)
    })
  });

})();