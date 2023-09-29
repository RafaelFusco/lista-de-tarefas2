const criaLi = () => {
    const li = document.createElement('li')
    return li
}

const criaBtnApagar = (li, name, nameClass) => {
    const btn = document.createElement('button')
    btn.innerText = `${name}`
    btn.setAttribute('class', `${nameClass}`)
    li.appendChild(btn)
}

export { criaLi, criaBtnApagar }