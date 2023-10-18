
const inputItemName = document.querySelector('.inputItemName')
const inputItemPosition = document.querySelector('.inputItemPosition')
const inputItemQt = document.querySelector('.inputItemQt')
const inputItemValue = document.querySelector('.inputItemValue')

const btnContainer = document.querySelector('.add-and-edit')
const btnItem = document.querySelector('.submit')

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

export { inputItemName, inputItemPosition, inputItemQt, inputItemValue, btnContainer, btnItem}