import { createItem } from "./components/item/script.js"
import { checkPrice } from "./components/priceChecks/script.js";

const saveItem = () => {
    const storedItem = []
    const liItem = document.querySelectorAll('.liItem')

    liItem.forEach((li) => {
        const divName = li.querySelector('.divName')
        const divPosition = li.id
        const divQt = li.querySelector('.divQt')
        const divValue = li.querySelector('.divValue')

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

addSavedItem()

checkPrice()

export { saveItem }