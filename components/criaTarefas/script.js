import { criaLi, criaBtnApagar } from "../tarefas/script.js"
import { salvarTarefas } from "../../script.js"

const inputNomeTarefa = document.querySelector('.nomeTarefa')
const inputValorTarefa = document.querySelector('.valorTarefa')

const btnTarefa = document.querySelector('.submit')
const tarefas = document.querySelector('.lista')

const criaTarefa = (textoInput, valorInput) => {
    const li = criaLi()

    const div = document.createElement('div')

    li.style.display = 'flex'

    div.innerText = textoInput + ' ' + valorInput + ' '

    li.appendChild(div)

    criaBtnApagar(li, 'Editar', 'editar')
    criaBtnApagar(li, 'Apagar', 'apagar')

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
        el.parentElement.remove()

        inputNomeTarefa.value = ''
        inputValorTarefa.value = ''
        btnTarefa.innerHTML = 'Adicionar'

        salvarTarefas()
        return

    } else if (el.classList.contains('editar')) {
        if (btnTarefa.innerHTML !== 'Editar') {
            let div = el.parentElement.querySelector('div')
            let textoCompl = div.textContent.split(" ")
            let textoCorreto = textoCompl[0] + ' ' + textoCompl[1]

            inputNomeTarefa.value = `${textoCompl[0]}`
            inputValorTarefa.value = `${textoCompl[1]}`
            btnTarefa.innerHTML = 'Editar'

            const btnTarefaClickHandler = function () {
                if (textoCompl[0] !== inputNomeTarefa.value || textoCompl[1] !== inputValorTarefa.value) {
                    let elementosLi = tarefas.querySelectorAll('li')

                    for (let i = 0; i < elementosLi.length; i++) {
                        let li = elementosLi[i]
                        let div = li.querySelector('div')

                        if (div.textContent.includes(textoCorreto)) {
                            textoCompl[0] = inputNomeTarefa.value
                            textoCompl[1] = inputValorTarefa.value

                            div.textContent = textoCompl[0] + ' ' + textoCompl[1]

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
