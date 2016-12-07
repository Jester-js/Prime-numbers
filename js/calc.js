const findPrimeNumbers = (n) => {
  let arr = new Array(n).fill(true, 2, n)
  let p = 2, i = 0
  do {
    arr = arr.map((e, i) => (i >= 2 * p) && !(i % p) ? false : e)
    for (i = p + 1; i < n; i++)
      if (arr[i]) break
    p = i
  } while (p * p < n)

  return arr.map((el, i) => el ? i : false)
            .filter(el => el)
}

const renderResults = (numbers, time) => {
  if (numbers && time) {
    const wrapResult = document.getElementById('out')

    const wrapNumbers = document.createElement('p')
    wrapNumbers.className = 'numbers'

    numbers.forEach(e => {
      const span = document.createElement('span')
      span.innerHTML = e
      wrapNumbers.appendChild(span)
    })
    wrapResult.appendChild(wrapNumbers)

    const statusWrap = document.createElement('p')
    statusWrap.className = 'status good'
    statusWrap.innerHTML = 'Finished.'
    wrapResult.appendChild(statusWrap)

    const timeWrap = document.createElement('p')
    timeWrap.className = 'time'
    timeWrap.innerHTML = `Total time - <span class="count">${time}</span> ms.`
    wrapResult.appendChild(timeWrap)
  } else {
    const statusWrap = document.createElement('p')
    statusWrap.className = 'status failed'
    statusWrap.innerHTML = 'Failed.'
  }
}

const button = document.getElementById('get')
const field = document.getElementById('limit')
button.onclick = function() {
  const c = this.className
  const limit = +field.value + 1
  if (c == 'positive') {
    const wrapResult = document.getElementById('out')
    wrapResult.innerHTML = '';

    const statusStart = document.createElement('p')
    statusStart.className = 'status good'
    statusStart.innerHTML = 'Started.'
    wrapResult.appendChild(statusStart)
    const t1 = new Date()
    const numbers = findPrimeNumbers(limit)
    if (numbers) {
      const t2 = new Date()
      const time = t2 - t1
      renderResults(numbers, time)
    } else {
      renderResults(null, null)
    }
  } else {
    console.log('fuck you')
  }
}
