import { criaLi, criaBtn } from "../tarefas/script.js"
import { salvarTarefas } from "../../script.js"

const inputNomeTarefa = document.querySelector('.nomeTarefa')
const inputValorTarefa = document.querySelector('.valorTarefa')

const btnTarefa = document.querySelector('.submit')
const tarefas = document.querySelector('.lista')

const criaTarefa = (textoInput, valueInput) => {
    const li = criaLi()

    const divName = document.createElement('div')
    const divValue = document.createElement('div')
    const divButtons = document.createElement('div')

    li.classList.add('liTarefa')
    divName.classList.add('divName')
    divValue.classList.add('divValue')
    divButtons.classList.add('liButtons')

    divName.innerText = textoInput
    divValue.innerText = valueInput

    li.appendChild(divName)
    li.appendChild(divValue)

    divButtons.appendChild(criaBtn(li, 'Editar', 'editar'))
    divButtons.appendChild(criaBtn(li, 'Apagar', 'apagar'))
    
    li.appendChild(divButtons)

    tarefas.appendChild(li)
    salvarTarefas()
}

const verificar = () => {
    if (!inputNomeTarefa.value || !inputValorTarefa.value) return
    criaTarefa(inputNomeTarefa.value, inputValorTarefa.value)
    inputNomeTarefa.value = ''
    inputValorTarefa.value = ''
    inputNomeTarefa.focus()
}

inputValorTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        createOrEdit(e)
    }
})

inputNomeTarefa.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        e.preventDefault()
    }
})

inputValorTarefa.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        e.preventDefault()
    }
})

btnTarefa.addEventListener('click', (e) => {
    createOrEdit(e)
});

document.addEventListener('click', (e) => {
    createOrEdit(e)
});

function createOrEdit(e) {
    let el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove()

        inputNomeTarefa.value = ''
        inputValorTarefa.value = ''
        btnTarefa.innerHTML = 'Adicionar'

        salvarTarefas()
        return

    } else if (el.classList.contains('editar')) {
        if (btnTarefa.innerHTML !== 'Editar') {
            let div = el.parentElement.parentElement.querySelector('.divName')
            let div2 = el.parentElement.parentElement.querySelector('.divValue')
            let textoCompl1 = div.textContent
            let textoCompl2 = div2.textContent
            let textoCorreto = textoCompl1 + ' ' + textoCompl2

            inputNomeTarefa.value = `${textoCompl1}`
            inputValorTarefa.value = `${textoCompl2}`
            btnTarefa.innerHTML = 'Editar'

            const btnTarefaClickHandler = function () {
                const novoNome = inputNomeTarefa.value.trim()
                const novoValor = inputValorTarefa.value.trim()
            
                if (novoNome !== '' && novoValor !== '') {
                    if (textoCompl1 !== novoNome || textoCompl2 !== novoValor) {
                        let elementosLi = tarefas.querySelectorAll('li')
            
                        for (let i = 0; i < elementosLi.length; i++) {
                            let li = elementosLi[i]
                            let divNome = li.querySelector('.divName')
                            let divValor = li.querySelector('.divValue')
            
                            if (divNome.textContent.trim() === textoCompl1 && divValor.textContent.trim() === textoCompl2) {
                                divNome.textContent = novoNome
                                divValor.textContent = novoValor
            
                                inputNomeTarefa.value = ''
                                inputValorTarefa.value = ''
                                btnTarefa.innerHTML = 'Adicionar'
            
                                salvarTarefas()
            
                                btnTarefa.removeEventListener('click', btnTarefaClickHandler)
                                return
                            }
                        }
                    } else {
                        alert('Mude o nome ou o valor para editar.')
                    }
                } else {
                    alert('Nome e valor da tarefa não podem estar em branco.')
                }
            }
            btnTarefa.addEventListener('click', btnTarefaClickHandler)
        } else {
            alert('voce já esta editando')
        }
    } else if (el.classList.contains('submit') && el.innerHTML === 'Adicionar') {
        verificar()
    }
}

export { tarefas, criaTarefa }
