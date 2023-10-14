import { listOfItems } from "../item/script.js";

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
    let elementLi = listOfItems.querySelectorAll('.liItem')

    for (let i = 0; i < elementLi.length; i++) {
        let liItem = elementLi[i]

        // let idLi = `item-${i}`
        // liItem.setAttribute('id', idLi)

        if (!liItem.classList.contains('true')) {

            let divQt = liItem.querySelector('.divQt')
            let divValue = liItem.querySelector('.divValue')

            let correctPrice = divValue.innerText * divQt.innerText
            divValue.innerText = correctPrice

            liItem.classList.add('true')
        }
    }
    let elementDivValue = listOfItems.querySelectorAll('.divValue')
    document.querySelector('.a3').innerHTML = `Valor total da lista: R$ ${checkTotalPrice(elementDivValue)}`
}

export { checkPrice }