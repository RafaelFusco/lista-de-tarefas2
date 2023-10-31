import { check } from "../item/script.js"
import { createSearchBar } from "../itemSearch/script.js"

const createEl = (el, classList, textCont) => {
    let element = document.createElement(`${el}`)
    if (classList !== 'null') {
        element.classList.add(`${classList}`)
    }
    if (textCont) {
        element.innerText = `${textCont}`
    }

    return element
}

const createArea = (areaClass, textLabel, inputClass, inputType) => {
    let area = createEl('div', `${areaClass}`)

    let label = document.createElement('label')
    label.innerText = `${textLabel}`

    let input = createEl('input', `${inputClass}`)
    if (inputType) {
        input.type = `${inputType}`
    }

    area.append(label, input)
    return area
}

const registerAndQuantity = () => {
    let createAndQtArea = createEl('div', 'create-and-qt')

    let itemArea = createEl('div', 'create-item-area')

    let nameAndPosition = createEl('div', 'name-and-position')

    let nameArea = createArea('name-area', 'Nome', 'inputItemName')
    let positionArea = createArea('position-area', 'Posição', 'inputItemPosition', 'number')

    let valueAndAmount = createEl('div', 'value-and-amount')

    let qtArea = createArea('qt-area', 'Unidade', 'inputItemQt', 'number')
    let valueArea = createArea('value-area', 'Valor da unidade', 'inputItemValue', 'number')

    let addAndEdit = createEl('div', 'add-and-edit')
    let add = createEl('button', 'add', 'Adicionar')

    nameAndPosition.append(nameArea, positionArea)
    valueAndAmount.append(qtArea, valueArea)
    addAndEdit.appendChild(add)
    itemArea.append(nameAndPosition, valueAndAmount, addAndEdit)
    createAndQtArea.append(itemArea, quantityOfItems(), listTitle())

    return createAndQtArea
}

const quantityOfItems = () => {
    let qtItems = createEl('div', 'qt-items-list')
    let itemQt = createEl('span', 'item-qt')
    let textItem = createEl('span', 'null', 'Items')

    qtItems.append(itemQt, textItem)

    return qtItems
}

const listTitle = () => {
    let title = createEl('div', 'title')

    let input = createEl('input', 'input-date')
    input.readOnly = true

    let button = createEl('button', 'button-date', 'Ed')

    let text1 = createEl('span', 'text-1', 'Lista do dia')

    title.append(text1, input, button)

    return title
}

const createSearchAndList = () => {
    let searchAndList = createEl('div', 'search-and-list')

    let searchBar = createEl('div', 'search-bar')

    let containerList = createEl('div', 'container-list')

    let labels = createEl('div', 'labels')
    let labelName = createEl('label', 'labelName', 'Nome')
    let labelQt = createEl('label', 'labelQt', 'Unidade')
    let labelValue = createEl('label', 'labelValue', 'Valor')
    let labelEdit = createEl('label', 'labelEdit', 'Editar')
    let labelDelete = createEl('label', 'labelDelete', 'Apagar')

    let list = createEl('ul', 'list')

    let totalValue = createEl('div', 'total-value')

    labels.append(labelName, labelQt, labelValue, labelEdit, labelDelete)

    containerList.append(labels, list, totalValue)

    searchAndList.append(searchBar, containerList)
    return searchAndList
}

const createSistem = () => {
    let container = document.querySelector('.container')

    container.append(registerAndQuantity(), createSearchAndList())
    createSearchBar()
}

createSistem()

const inputItemName = document.querySelector('.inputItemName')
const inputItemPosition = document.querySelector('.inputItemPosition')
const inputItemQt = document.querySelector('.inputItemQt')
const inputItemValue = document.querySelector('.inputItemValue')

const btnContainer = document.querySelector('.add-and-edit')
const btnItem = document.querySelector('.add')

const inputElement = document.querySelector('.input-date');
const btnDate = document.querySelector('.button-date')

inputItemValue.addEventListener('keypress', (event) => {
    let keyCode = event.keyCode || event.which
    if (keyCode === 43 || keyCode === 45) {
        event.preventDefault()
    }
})

inputItemQt.addEventListener('keypress', function (event) {
    let keyCode = event.keyCode || event.which

    if (keyCode === 44 || keyCode === 46 || keyCode === 43 || keyCode === 45) {
        event.preventDefault()
    }
})

btnItem.addEventListener('click', () => {
    if (btnItem.innerText === 'Adicionar') {
        check()
    }
})

inputElement.addEventListener('input', function () {
    const valor = inputElement.value;

    localStorage.setItem('chaveParaSalvar', valor);
});

btnDate.addEventListener('click', () => {
    if (inputElement.readOnly === true) {
        inputElement.readOnly = false
        inputElement.focus()
    } else {
        if (inputElement.value > 0 && inputElement.value <= 31 && inputElement.value !== '') {
            inputElement.readOnly = true
        } else {
            alert('insira um dia entre 1 a 31')
        }
    }
})

window.addEventListener('load', function () {
    const valorSalvo = localStorage.getItem('chaveParaSalvar');
    if (valorSalvo !== '') {
        inputElement.value = valorSalvo;
    } else {
        inputElement.value = 1
    }
});

export { inputItemName, inputItemPosition, inputItemQt, inputItemValue, btnContainer, btnItem }