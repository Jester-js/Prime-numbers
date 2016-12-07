const findErrors = (str) => {
  let errors = []

  // code 0 - empty string
  const empty = (str) => !str ? [{ code: '0' }] : []
  errors = [...errors, ...empty(str)]

  // code 1 - too much dots
  const checkDots = (str) => {
    const regExpDot = /[.]/g;
    const arrayDots = str.match(regExpDot)
    return arrayDots && (arrayDots.length > 1) ? [{ code: '1' }] : []
  }
  errors = [...errors, ...checkDots(str)]

  // code 2 - unnecessary symbols
  const findOtherSymbols = (str) => {
    const strWithoutNumbersAndDots = str.replace(/[0-9.]/g, '')
    const regExpSymb = /./g
    const arr = strWithoutNumbersAndDots.match(regExpSymb)
    return arr ? [{ code: '2', symbols: [...new Set(arr)] }] : []
  }
  errors = [...errors, ...findOtherSymbols(str)]

  // code 3 - no errors. all is good
  return errors.length ? errors : [{ code: '3' }]
}

const handlerErrors = (error) => {
  switch(error.code) {
    case '0':
      appendToMessages('warning', `<p>Please, start enter your limit</p>`)
      break;
    case '1':
      appendToMessages('error', `<p><span>Too much symbols </span><span class="symb">.</span></p><p>You can use only one</p>`)
      break;
    case '2':
      error.symbols.forEach(item => appendToMessages('error', `<p><span>Wrong symbol </span><span class="symb">${item}</span></p>`))
      break;
    case '3':
      appendToMessages('ok', `<p>Looks good</p>`)
      break;
  }
}

const wrap = document.getElementById('messages')
const renderMessages = (messages) => {
  messages.forEach(item => {
    wrap.appendChild(item)
  })
}

const appendToMessages = (className, elements) => {
  let messages = []
  const wrap = document.createElement('div')
  wrap.className = className
  wrap.innerHTML = elements
  messages = [...messages, wrap]
  renderMessages(messages)
}

// Render help messages
const showHelpMessages = (className) => {
  const field = document.getElementById('limit')
  const button = document.getElementById('get')
  field.className = className
  button.className = className
}

// validation while input number entering

const input = document.getElementById('limit')
input.oninput = function() {
  const str = this.value
  const errors = findErrors(str)
  wrap.innerHTML = ''
  if (errors.length == 1 && errors[0].code == '3') {
    showHelpMessages('positive')
  } else if (errors.length == 1 && errors[0].code == '0') {
    showHelpMessages('neutral')
  } else {
    showHelpMessages('negative')
  }
  errors.forEach(item => {
    handlerErrors(item)
  })
}
