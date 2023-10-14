import { saveItem } from "../../script.js"
import { checkPrice } from "../priceChecks/script.js"
import { createBtn } from "../itemBtn/script.js"
import {
    inputItemName, inputItemValue, inputItemQt,
    btnContainer, btnItem
} from "../itemForm/script.js"
import { createSearchBar } from "../itemSearch/script.js"

const listOfItems = document.querySelector('.lista')


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

    divButtons.appendChild(createBtn('Ed', 'editar'))
    divButtons.appendChild(createBtn('Ap', 'apagar'))

    liItem.appendChild(divName)
    liItem.appendChild(divQt)
    liItem.appendChild(divContainerValue)
    liItem.appendChild(divButtons)

    listOfItems.appendChild(liItem)
    checkPrice()
    saveItem()
}

const check = () => {
    if (!inputItemName.value || !inputItemQt.value || !inputItemValue.value) {
        alert('Preencha todos os campos abaixo para adicionar o item.')
        return
    } else {
        let tem = false
        let items = listOfItems.querySelectorAll('.liItem')

        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemName = item.querySelector('.divName').textContent

            if (inputItemName.value === itemName) {
                tem = true
            }
        }

        if (tem === false) {
            createItem(inputItemName.value, inputItemQt.value, inputItemValue.value)

            inputItemName.value = ''
            inputItemQt.value = ''
            inputItemValue.value = ''

            inputItemName.focus()
        } else {
            alert('Já existe um item com este nome na lista.')
        }
    }
}

const createCancelEdit = () => {
    const cancel = document.createElement('button')
    cancel.classList.add('cancel')
    cancel.innerText = 'Cancelar'
    return cancel
}

btnItem.addEventListener('click', () => {
    if (btnItem.innerText === 'Adicionar') {
        check()
    }
})

function deleteOrEdit(e) {
    let el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove()

        inputItemName.value = ''
        inputItemQt.value = ''
        inputItemValue.value = ''

        btnItem.innerHTML = 'Adicionar'

        saveItem()
        checkPrice()
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
            btnItem.classList.add('edit')


            const btnCancel = createCancelEdit()

            btnContainer.appendChild(btnCancel)

            btnCancel.addEventListener('click', () => {
                btnItem.innerHTML = 'Adicionar'

                inputItemName.value = ''
                inputItemQt.value = ''
                inputItemValue.value = ''

                btnItem.classList.remove('edit')
                btnCancel.remove()
                btnItem.removeEventListener('click', itemBtnHandler)

                return
            })

            const itemBtnHandler = function () {
                const newName = inputItemName.value.trim()
                const newQt = inputItemQt.value.trim()
                const newValue = inputItemValue.value.trim()
                const correctPrice = newValue * newQt

                if (newName !== '' && newQt !== '' && newValue !== '') {
                    if (contentDivName !== newName || contentDivQt !== newQt || contentDivValue !== String(correctPrice)) {

                        let elementLi = listOfItems.querySelectorAll('.liItem')

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

                                btnItem.classList.remove('edit')
                                btnCancel.remove()
                                btnItem.removeEventListener('click', itemBtnHandler)
                                return
                            }
                        }
                    } else {
                        alert('Altere algum dos campos abaixo para editar o item.')
                    }
                } else {
                    alert('Nenhum campo pode estar em branco.')
                }
            }
            btnItem.addEventListener('click', itemBtnHandler)
        } else {
            alert('você já esta editando.')
        }
    } else if (el.classList.contains('search')) {
        let inputSearch = document.querySelector('.inputSearch')

        let items = listOfItems.querySelectorAll('.liItem')

        if (inputSearch.value !== '') {
            items.forEach(item => {
                let nameItem = item.querySelector('.divName').textContent

                if (inputSearch.value === nameItem) {

                    item.style.background = 'green'

                    setTimeout(() => {
                        item.style.background = '#fff'
                    }, 1000);
                }
            });
        }
    }
}

document.addEventListener('click', (e) => {
    deleteOrEdit(e)
})

createSearchBar()

export { listOfItems, createItem, deleteOrEdit }
