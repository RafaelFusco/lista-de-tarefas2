import { attIndex } from "../item/script.js";
import { inputItemPosition } from "../itemForm/script.js";

let totalValue = 0

const checkTotalPrice = (nodeList) => {
    let value = 0;

    for (let i = 0; i < nodeList.length; i++) {
        let numero = parseFloat(nodeList[i].textContent);
        value += numero;
    }

    totalValue = value

    return totalValue
}

const checkPrice = () => {
    let listOfItems = document.querySelector('.list')
    let elementLi = listOfItems.querySelectorAll('.liItem')

    if (elementLi.length > 0) {   
        attIndex(elementLi)
    }

    inputItemPosition.value = elementLi.length + 1


    for (let i = 0; i < elementLi.length; i++) {
        let liItem = elementLi[i]

        if (!liItem.classList.contains('true')) {

            let divQt = liItem.querySelector('.div-qt')
            let divValue = liItem.querySelector('.div-value')

            let correctPrice = divValue.innerText * divQt.innerText
            divValue.innerText = correctPrice

            liItem.classList.add('true')
        }
    }
    let elementDivValue = listOfItems.querySelectorAll('.div-value')
    document.querySelector('.total-value').innerHTML = `Valor total da lista: R$ ${checkTotalPrice(elementDivValue)}`
    document.querySelector('.item-qt').innerHTML = `${elementLi.length}`
    
}

export { checkPrice }