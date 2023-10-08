import { createBtn } from "../tarefas/script.js"
import { saveItem } from "../../script.js"

const inputItemQt = document.querySelector('.inputItemQt')
const inputItemName = document.querySelector('.inputItemName')
const inputItemValue = document.querySelector('.inputItemValue')

const btnItem = document.querySelector('.submit')
const item = document.querySelector('.lista')

const createItem = (qtInput, textInput, valueInput) => {
    let liItem = document.createElement('li')
    liItem.classList.add('liItem')

    let divQt = document.createElement('div')
    divQt.classList.add('divQt')
    divQt.innerText = `${qtInput}`

    let divName = document.createElement('div')
    divName.classList.add('divName')
    divName.innerText = textInput

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

    divButtons.appendChild(createBtn(liItem, 'Editar', 'editar'))
    divButtons.appendChild(createBtn(liItem, 'Apagar', 'apagar'))

    liItem.appendChild(divQt)
    liItem.appendChild(divName)
    liItem.appendChild(divContainerValue)
    liItem.appendChild(divButtons)

    item.appendChild(liItem)
    saveItem()
}

const check = () => {
    if (!inputItemName.value || !inputItemValue.value || !inputItemQt.value) return
    createItem(inputItemQt.value ,inputItemName.value, inputItemValue.value)
    inputItemName.value = ''
    inputItemValue.value = ''
    inputItemQt.value = ''
    inputItemName.focus()
}

function createOrEdit(e) {
    let el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove()

        inputItemQt.value = ''
        inputItemName.value = ''
        inputItemValue.value = ''

        btnItem.innerHTML = 'Adicionar'

        saveItem()
        return

    } else if (el.classList.contains('editar')) {
        if (btnItem.innerHTML !== 'Editar') {
            let divQt = el.parentElement.parentElement.querySelector('.divQt')
            let divName = el.parentElement.parentElement.querySelector('.divName')
            let divValue = el.parentElement.parentElement.querySelector('.divValue')

            let contentDivQt = divQt.textContent
            let contentDivName = divName.textContent
            let contentDivValue = divValue.textContent

            inputItemQt.value = `${contentDivQt}`
            inputItemName.value = `${contentDivName}`
            inputItemValue.value = `${contentDivValue}`

            btnItem.innerHTML = 'Editar'

            const taskButtonHandler = function () {
                const newQt = inputItemQt.value.trim()
                const newName = inputItemName.value.trim()
                const newValue = inputItemValue.value.trim()

                if (newName !== '' && newValue !== '' && newQt !== '') {
                    if (contentDivName !== newName || contentDivValue !== newValue || contentDivQt !== newQt) {
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

                                saveItem()

                                btnItem.removeEventListener('click', taskButtonHandler)
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
            btnItem.addEventListener('click', taskButtonHandler)
        } else {
            alert('voce já esta editando')
        }
    } else if (el.classList.contains('submit') && el.innerHTML === 'Adicionar') {
        check()
    }
}

btnItem.addEventListener('click', (e) => {
    createOrEdit(e)
})

document.addEventListener('click', (e) => {
    createOrEdit(e)
})

export { item, createItem }
