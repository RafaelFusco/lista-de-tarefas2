import { createBtn } from "../tarefas/script.js"
import { saveItem } from "../../script.js"

const inputItemName = document.querySelector('.inputItemName')
const inputItemQt = document.querySelector('.inputItemQt')
const inputItemValue = document.querySelector('.inputItemValue')

const btnItem = document.querySelector('.submit')
const item = document.querySelector('.lista')

const createItem = (textInput, qtInput, valueInput) => {
    let liItem = document.createElement('li')
    liItem.classList.add('liItem')

    let divName = document.createElement('div')
    divName.classList.add('divName')
    divName.innerText = textInput

    let divQt = document.createElement('div')
    divQt.classList.add('divQt')
    divQt.innerText = `${qtInput}`

    let divContainerValue = document.createElement('div')
    divContainerValue.classList.add('divContainerValue')

    let divMoney = document.createElement('div')
    divMoney.classList.add('divMoney')
    divMoney.innerText = 'R$:'

    let divValue = document.createElement('div')
    divValue.classList.add('divValue')
    divValue.innerText = valueInput

    let divButtons = document.createElement('div')
    divButtons.classList.add('liButtons')

    divContainerValue.appendChild(divMoney)
    divContainerValue.appendChild(divValue)

    divButtons.appendChild(createBtn(liItem, 'Ed', 'editar'))
    divButtons.appendChild(createBtn(liItem, 'Ap', 'apagar'))

    liItem.appendChild(divName)
    liItem.appendChild(divQt)
    liItem.appendChild(divContainerValue)
    liItem.appendChild(divButtons)

    item.appendChild(liItem)
    checkPrice()
    saveItem()
}

const check = () => {
    if (!inputItemName.value || !inputItemQt.value || !inputItemValue.value) return

    createItem(inputItemName.value, inputItemQt.value, inputItemValue.value)

    inputItemName.value = ''
    inputItemQt.value = ''
    inputItemValue.value = ''

    inputItemName.focus()
}

const checkPrice = () => {
    let elementLi = item.querySelectorAll('.liItem')

    for (let i = 0; i < elementLi.length; i++) {
        let liItem = elementLi[i]

        if (!liItem.classList.contains('true')) {

            let divQt = liItem.querySelector('.divQt')
            let divValue = liItem.querySelector('.divValue')

            let correctPrice = divValue.innerText * divQt.innerText
            divValue.innerText = correctPrice
            liItem.classList.add('true')
        } 
    }
}

function createOrEdit(e) {
    let el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove()

        inputItemName.value = ''
        inputItemQt.value = ''
        inputItemValue.value = ''

        btnItem.innerHTML = 'Adicionar'

        saveItem()
        return

    } else if (el.classList.contains('editar')) {
        if (btnItem.innerHTML !== 'Editar') {
            let divName = el.parentElement.parentElement.querySelector('.divName')
            let divQt = el.parentElement.parentElement.querySelector('.divQt')
            let divValue = el.parentElement.parentElement.querySelector('.divValue')

            let contentDivName = divName.textContent
            let contentDivQt = divQt.textContent
            let contentDivValue = divValue.textContent

            inputItemName.value = `${contentDivName}`
            inputItemQt.value = `${contentDivQt}`

            if (contentDivQt > 1) {
                let unitPrice = contentDivValue / contentDivQt
                inputItemValue.value = `${unitPrice}`
            } else {
                inputItemValue.value = `${contentDivValue}`
            }

            btnItem.innerHTML = 'Editar'

            const itemBtnHandler = function () {
                const newName = inputItemName.value.trim()
                const newQt = inputItemQt.value.trim()
                const newValue = inputItemValue.value.trim()
                const correctPrice = newValue * newQt

                if (newName !== '' && newQt !== '' && newValue !== '') {
                    if (contentDivName !== newName || contentDivQt !== newQt || contentDivValue !== String(correctPrice)) {

                        let elementLi = item.querySelectorAll('.liItem')

                        for (let i = 0; i < elementLi.length; i++) {
                            let liItem = elementLi[i]

                            let divQt = liItem.querySelector('.divQt')
                            let divName = liItem.querySelector('.divName')
                            let divValue = liItem.querySelector('.divValue')

                            if (divName.textContent.trim() === contentDivName && divValue.textContent.trim() === contentDivValue && divQt.textContent.trim() === contentDivQt) {

                                divQt.textContent = newQt
                                divName.textContent = newName
                                divValue.textContent = newValue

                                inputItemQt.value = ''
                                inputItemName.value = ''
                                inputItemValue.value = ''

                                btnItem.innerHTML = 'Adicionar'

                                liItem.classList.remove('true')
                                checkPrice()

                                saveItem()
                                
                                btnItem.removeEventListener('click', itemBtnHandler)
                                return
                            }
                        }
                    } else {
                        alert('Mude o nome ou o valor para editar.')
                    }
                } else {
                    alert('Nome e valor da tarefa não podem estar em branco.')
                }
            }
            btnItem.addEventListener('click', itemBtnHandler)
        } else {
            alert('voce já esta editando')
        }
    } else if (el.classList.contains('submit') && el.innerHTML === 'Adicionar') {
        check()
    }
}

inputItemValue.addEventListener('keypress', (event) => {
    let keyCode = event.keyCode || event.which
    if (keyCode === 43 || keyCode === 45) {
        event.preventDefault()
    }
})

inputItemQt.addEventListener('keypress', function (event) {
    let keyCode = event.keyCode || event.which
    console.log(keyCode);
    if (keyCode === 44 || keyCode === 46 || keyCode === 43 || keyCode === 45) {
        event.preventDefault()
    }
})

btnItem.addEventListener('click', (e) => {
    createOrEdit(e)
})

document.addEventListener('click', (e) => {
    createOrEdit(e)
})

export { item, createItem, checkPrice }
