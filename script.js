import { check, createItem } from "./components/item/script.js"
import { createSearchBar } from "./components/itemSearch/script.js";
import { checkPrice } from "./components/priceChecks/script.js";

const saveItem = () => {
    const storedItem = []
    const liItem = document.querySelectorAll('.liItem')

    liItem.forEach((li) => {
        const divName = li.querySelector('.div-name')
        const divPosition = li.id
        const divQt = li.querySelector('.div-qt')
        const divValue = li.querySelector('.div-value')

        const correctValue = Number(divValue.textContent / divQt.textContent)

        if (!li.classList.contains('true')) {

            const nameItem = divName.textContent.trim()
            const positionItem = divPosition
            const qtItem = divQt.textContent.trim()
            const valueItem = divValue.textContent.trim()

            const textItem = `${nameItem} ${qtItem} ${valueItem} ${positionItem}`

            storedItem.push(textItem)
        } else {
            const nameItem = divName.textContent.trim()
            const positionItem = divPosition
            const qtItem = divQt.textContent.trim()
            const valueItem = correctValue

            const textItem = `${nameItem} ${qtItem} ${valueItem} ${positionItem}`

            storedItem.push(textItem)
        }
    });

    localStorage.setItem('items', JSON.stringify(storedItem))
};

const addSavedItem = () => {
    const itemJSON = localStorage.getItem('items')

    if (itemJSON) {
        const toDoList = JSON.parse(itemJSON)

        toDoList.forEach((textItem) => {
            const [nameItem, qtItem, valueItem, positionItem] = textItem.split(' ')
            createItem(nameItem, qtItem, valueItem, positionItem)
        })
    }
}

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

    area.appendChild(label)
    area.appendChild(input)

    return area
}

const createItemList = () => {
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

    nameAndPosition.appendChild(nameArea)
    nameAndPosition.appendChild(positionArea)

    valueAndAmount.appendChild(qtArea)
    valueAndAmount.appendChild(valueArea)

    addAndEdit.appendChild(add)
    
    itemArea.appendChild(nameAndPosition)
    itemArea.appendChild(valueAndAmount)
    itemArea.appendChild(addAndEdit)

    createAndQtArea.appendChild(itemArea)
    createAndQtArea.appendChild(createQtItemsList())
    createAndQtArea.appendChild(listTitle())

    return createAndQtArea
}

const createQtItemsList = () => {
    let qtItems = createEl('div', 'qt-items-list')
    let itemQt = createEl('span', 'item-qt')
    let textItem = createEl('span', 'null', 'Items')

    qtItems.appendChild(itemQt)
    qtItems.appendChild(textItem)

    return qtItems
}

const listTitle = () => {
    let title = createEl('div', 'title')

    let input = createEl('input', 'input-date')
    input.value = 1
    
    let button = createEl('button', 'button-date', 'Ed')

    let text1 = createEl('span', 'text-1', 'Lista do dia')

    title.appendChild(text1)
    title.appendChild(input)
    title.appendChild(button)

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

    containerList.appendChild(labels)
    containerList.appendChild(list)
    containerList.appendChild(totalValue)
    
    searchAndList.appendChild(searchBar)
    searchAndList.appendChild(containerList)
    

    return searchAndList
}

const createSistem = () => {
    let container = document.querySelector('.container')

    container.appendChild(createItemList())
    container.appendChild(createSearchAndList())
}

createSistem()
createSearchBar()

const inputItemName = document.querySelector('.inputItemName')
const inputItemPosition = document.querySelector('.inputItemPosition')
const inputItemQt = document.querySelector('.inputItemQt')
const inputItemValue = document.querySelector('.inputItemValue')

const btnContainer = document.querySelector('.add-and-edit')
const btnItem = document.querySelector('.add')

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

addSavedItem()
checkPrice()

export { saveItem, inputItemName, inputItemPosition, inputItemQt, inputItemValue, btnContainer, btnItem }