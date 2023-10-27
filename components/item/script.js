import { saveItem } from "../../script.js"
import { checkPrice } from "../priceChecks/script.js"
import { createBtn } from "../itemBtn/script.js"
import { inputItemName, inputItemValue, inputItemQt, btnContainer, btnItem, inputItemPosition } from "../../script.js"
import { createSearchBar } from "../itemSearch/script.js"

function capitalizeFirstLetter(input) {
    return input
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-')
}
const attIndex = (items) => {
    const sortedItems = Array.from(items).sort((a, b) => {
        const idA = parseInt(a.id)
        const idB = parseInt(b.id)
        return idA - idB
    })

    const list = items[0].parentNode

    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    sortedItems.forEach((el, index) => {
        const newId = (index + 1).toString()
        el.id = newId
        list.appendChild(el)
    })
}

const createItem = (textInput, qtInput, valueInput, index) => {
    let listOfItems = document.querySelector('.list')

    let liItem = document.createElement('li')
    liItem.classList.add('liItem')
    liItem.id = `${index - 1}`

    let divName = document.createElement('div')
    divName.classList.add('div-name')

    let name = capitalizeFirstLetter(textInput)
    let adaptedName = name.replace(/\s/g, "-")
    divName.innerText = adaptedName

    let divQt = document.createElement('div')
    divQt.classList.add('div-qt')
    divQt.innerText = `${qtInput}`

    let divContainerValue = document.createElement('div')
    divContainerValue.classList.add('div-container-value')

    let divMoney = document.createElement('div')
    divMoney.classList.add('div-money')
    divMoney.innerText = 'R$:'

    let divValue = document.createElement('div')
    divValue.classList.add('div-value')
    divValue.innerText = valueInput

    let divButtons = document.createElement('div')
    divButtons.classList.add('div-buttons')

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

    liItem.scrollIntoView({ behavior: "smooth" })
}

const check = () => {
    let listOfItems = document.querySelector('.list')
    let itemsOfList = listOfItems.querySelectorAll('.liItem')

    if (!inputItemName.value || !inputItemPosition.value || !inputItemQt.value || !inputItemValue.value) {
        alert('Preencha todos os campos abaixo para adicionar o item.')
        return
    } else if (inputItemPosition.value > 0 && inputItemPosition.value <= itemsOfList.length + 1) {
        let tem = false
        let items = listOfItems.querySelectorAll('.liItem')

        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemName = item.querySelector('.div-name').textContent

            if (inputItemName.value === itemName) {
                tem = true
            }
        }

        if (tem === false) {
            createItem(inputItemName.value, inputItemQt.value, inputItemValue.value, inputItemPosition.value)

            inputItemName.value = ''
            inputItemQt.value = ''
            inputItemValue.value = ''

            inputItemName.focus()
        } else {
            alert('Já existe um item com este nome na lista.')
        }
    } else {
        alert(`A posição do item na lista deve ser entre 1 a ${itemsOfList.length + 1}`)
    }
}

const createCancelEdit = () => {
    const cancel = document.createElement('button')
    cancel.classList.add('cancel')
    cancel.innerText = 'Cancelar'
    return cancel
}

function deleteOrEdit(e) {
    let listOfItems = document.querySelector('.list')
    let itemsOfList = listOfItems.querySelectorAll('.liItem')
    let el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove()

        inputItemName.value = ''
        inputItemQt.value = ''
        inputItemValue.value = ''

        btnItem.innerHTML = 'Adicionar'

        if (btnItem.classList.contains('edit')) {
            btnItem.classList.remove('edit')
            document.querySelector('.cancel').remove()
        }

        inputItemPosition.value = itemsOfList.length + 1

        saveItem()
        checkPrice()
        return

    } else if (el.classList.contains('editar')) {
        if (btnItem.innerHTML !== 'Editar') {
            let divName = el.parentElement.parentElement.querySelector('.div-name')

            let divPosition = el.parentElement.parentElement.id

            let divQt = el.parentElement.parentElement.querySelector('.div-qt')
            let divValue = el.parentElement.parentElement.querySelector('.div-value')

            let contentDivName = divName.textContent
            let contentDivPosition = divPosition
            let contentDivQt = divQt.textContent
            let contentDivValue = divValue.textContent

            inputItemName.value = `${contentDivName}`
            inputItemPosition.value = `${contentDivPosition}`
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

                inputItemPosition.value = itemsOfList.length + 1
                return
            })

            const itemBtnHandler = function () {
                if (inputItemPosition.value > 0 && inputItemPosition.value <= itemsOfList.length + 1) {
                    let newName = inputItemName.value.trim()
                    let newPosition = inputItemPosition.value.trim()
                    let newQt = inputItemQt.value.trim()
                    let newValue = inputItemValue.value.trim()
                    let correctPrice = newValue * newQt

                    let name = capitalizeFirstLetter(newName)
                    newName = name.replace(/\s/g, "-")

                    if (newName !== '' && newQt !== '' && newValue !== '' && newPosition !== '') {
                        if (contentDivName !== newName || contentDivQt !== newQt || contentDivValue !== String(correctPrice) || contentDivPosition !== newPosition) {

                            let elementLi = listOfItems.querySelectorAll('.liItem')

                            for (let i = 0; i < elementLi.length; i++) {
                                let liItem = elementLi[i]

                                let divName = liItem.querySelector('.div-name')
                                let divPosition = liItem.id
                                let divQt = liItem.querySelector('.div-qt')
                                let divValue = liItem.querySelector('.div-value')

                                if (divName.textContent.trim() === contentDivName && divValue.textContent.trim() === contentDivValue && divQt.textContent.trim() === contentDivQt && divPosition === contentDivPosition) {

                                    el.parentElement.parentElement.remove()

                                    newPosition < divPosition ?
                                        createItem(newName, newQt, newValue, newPosition) :
                                        createItem(newName, newQt, newValue, parseInt(newPosition) + 1)

                                    inputItemName.value = ''
                                    inputItemQt.value = ''
                                    inputItemValue.value = ''

                                    btnItem.innerHTML = 'Adicionar'

                                    liItem.classList.remove('true')

                                    saveItem()
                                    checkPrice()

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
                } else {
                    alert(`A posição do item na lista deve ser entre 1 a ${itemsOfList.length}`)
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
                let nameItem = item.querySelector('.div-name').textContent
                let itemNameAdapted = capitalizeFirstLetter(inputSearch.value)

                if (inputSearch.value === nameItem || itemNameAdapted === nameItem) {
                    item.scrollIntoView({ behavior: "smooth" })
                    item.style.background = 'green'

                    setTimeout(() => {
                        item.style.background = '#fff'
                    }, 1000)
                }
            })
        }
    }
}

document.addEventListener('click', (e) => {
    deleteOrEdit(e)
})

export { createItem, deleteOrEdit, attIndex, check }
