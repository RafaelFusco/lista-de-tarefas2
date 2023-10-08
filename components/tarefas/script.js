const createBtn = (li, name, nameClass) => {
    const btn = document.createElement('button')
    btn.innerText = `${name}`
    btn.setAttribute('class', `${nameClass}`)
    li.appendChild(btn)
    return btn
}

export { createBtn }