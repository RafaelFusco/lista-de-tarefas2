const criaLi = () => {
    const li = document.createElement('li')
    return li
}

const criaBtn = (li, name, nameClass) => {
    const btn = document.createElement('button')
    btn.innerText = `${name}`
    btn.setAttribute('class', `${nameClass}`)
    li.appendChild(btn)
    return btn
}

export { criaLi, criaBtn }