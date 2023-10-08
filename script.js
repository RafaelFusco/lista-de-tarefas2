import { createItem } from "./components/criaTarefas/script.js"

const saveItem = () => {
    const storedItem = []
    const liItem = document.querySelectorAll('.liItem')

    liItem.forEach((li) => {
        const divName = li.querySelector('.divName')
        const divValue = li.querySelector('.divValue')
        const divQt = li.querySelector('.divQt')

        const qtItem = divQt.textContent.trim()
        const nameItem = divName.textContent.trim()
        const valueItem = divValue.textContent.trim()

        const textItem = `${qtItem} ${nameItem} ${valueItem}`

        storedItem.push(textItem)
    });

    localStorage.setItem('items', JSON.stringify(storedItem))
};

const addSavedItem = () => {
    const itemJSON = localStorage.getItem('items')

    if (itemJSON) {
        const toDoList = JSON.parse(itemJSON)

        toDoList.forEach((textItem) => {
            const [nameItem, valueItem, qtItem] = textItem.split(' ')
            createItem(nameItem, valueItem, qtItem)
        })
    }
}

addSavedItem()

export { saveItem }