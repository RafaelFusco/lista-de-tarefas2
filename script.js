import { createItem } from "./components/item/script.js"
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

const listTitle = () => {
    let title = document.querySelector('.title')

    let input = document.createElement('input')
    input.classList.add('input-date')
    input.value = 1

    let button = document.createElement('button')
    button.classList.add('button-date')
    button.innerText = 'Ed'

    let text1 = document.createElement('span')
    text1.classList.add('text-1')
    text1.innerText = 'Lista do dia'
    
    title.appendChild(text1)
    title.appendChild(input)
    title.appendChild(button)
}

listTitle()
addSavedItem()
checkPrice()

export { saveItem }