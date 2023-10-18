import { createBtn } from "../itemBtn/script.js"

const searchArea = document.querySelector('.a4')

const createSearchBar = () => {
    let input = document.createElement('input')
    input.classList.add('inputSearch')

    searchArea.appendChild(input)
    searchArea.appendChild(createBtn('Pesquisar', 'search'))
}

export { createSearchBar }