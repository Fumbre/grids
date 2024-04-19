(()=>{
  const form = document.querySelector('.contacts-aplicatoin__form')
  const input = form.querySelector('.contacts-aplicatoin__input')
  const email = form.querySelector('.contacts-aplicatoin__inputEmail')

  const subForm = document.querySelector('.subscribe-form')
  const subEmail = subForm.querySelector('.subscribe-form__input')

  function formValid(){
    const inputCheck = inputTextCheck(input)
    const emailCheck = inputEmailCheck(email)
  }

  function inputEmailCheck(email) {
    const value = email.value.trim()
    const label = email.parentElement
    let pass = false 
    const oneSymbolCheck = [...value].filter((word)=>word === '@' ? true : false).length === 1 ? true : false
    if(!oneSymbolCheck) {
      toggleClass(email, label, pass) 
      return pass
    }
    const beforeEmail = value.slice(0, value.indexOf('@')).length > 1
    if(!beforeEmail) {
      toggleClass(email, label, pass) 
      return pass
    }
    const restEmail = value.slice(value.indexOf('@') + 1)
    const oneDotCheck = [...restEmail].filter((word)=>word === '.' ? true : false).length === 1 ? true : false
    if(!oneDotCheck) {
      toggleClass(email, label, pass) 
      return pass
    }
    const afterDot = restEmail.slice(restEmail.indexOf('.') + 1).length > 1
    if(!afterDot) {
      toggleClass(email, label, pass) 
      return pass
    }
    const beforeDot = restEmail.slice(0, restEmail.indexOf('.')).length > 1 
    if(!beforeDot) {
      toggleClass(email, label, pass) 
      return pass
    }
    pass = true
    toggleClass(email, label, pass) 
    return pass
  }

  function inputTextCheck(input) {
    const value = input.value.trim()
    const label = input.parentElement
    let pass = true
    if(value.length === 0) pass = false
    for(let word of value) {
      if (word.toUpperCase() === word.toLowerCase()) pass = false
    }
    toggleClass(input, label, pass)

    return pass
  }

  function toggleClass(el, par, pass) {
    par.classList.toggle('notValid__text', !pass)
    par.classList.toggle('notValid', !pass)
    el.classList.toggle('notValid__input', !pass)
    el.classList.toggle('notValid', !pass)
  }

  input.addEventListener('input', ()=> inputTextCheck(input))
  email.addEventListener('input', ()=> inputEmailCheck(email))
  subEmail.addEventListener('input', ()=> inputEmailCheck(subEmail))

  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    formValid()
  })

  subForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    inputEmailCheck(subEmail)
  })

})();
