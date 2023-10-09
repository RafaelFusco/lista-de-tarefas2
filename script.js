import { checkPrice, createItem } from "./components/criaTarefas/script.js"

const saveItem = () => {
    const storedItem = []
    const liItem = document.querySelectorAll('.liItem')

    liItem.forEach((li) => {
        const divName = li.querySelector('.divName')
        const divQt = li.querySelector('.divQt')
        const divValue = li.querySelector('.divValue')

        const correctValue = Number(divValue.textContent / divQt.textContent)

        if (!li.classList.contains('true')) {

            const nameItem = divName.textContent.trim()
            const qtItem = divQt.textContent.trim()
            const valueItem = divValue.textContent.trim()

            const textItem = `${nameItem} ${qtItem} ${valueItem}`

            storedItem.push(textItem)
        } else {
            const nameItem = divName.textContent.trim()
            const qtItem = divQt.textContent.trim()
            const valueItem = correctValue

            const textItem = `${nameItem} ${qtItem} ${valueItem}`
            
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
            const [nameItem, qtItem, valueItem] = textItem.split(' ')
            createItem(nameItem, qtItem, valueItem)
        })
    }
}

addSavedItem()

checkPrice()

export { saveItem, addSavedItem }