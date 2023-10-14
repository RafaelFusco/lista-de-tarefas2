const createBtn = (name, nameClass) => {
    const btn = document.createElement('button')
    btn.innerText = `${name}`
    btn.setAttribute('class', `${nameClass}`)
   
    return btn
}

export { createBtn }