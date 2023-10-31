import { createBtn } from "../itemBtn/script.js"

const createSearchBar = () => {
    const searchBar = document.querySelector('.search-bar')
    let input = document.createElement('input')
    input.classList.add('inputSearch')

    searchBar.appendChild(input)
    searchBar.appendChild(createBtn('Pesquisar', 'search'))
}

export { createSearchBar }