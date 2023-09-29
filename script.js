import { tarefas, criaTarefa } from "./components/criaTarefas/script.js"

const salvarTarefas = () => {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        tarefaTexto = tarefaTexto.replace('Editar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

const addTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let textoTarefa of listaDeTarefas) {
        const [nomeTarefa, valorTarefa] = textoTarefa.split(' ')
        criaTarefa(nomeTarefa, valorTarefa)
    }
}

addTarefasSalvas()

export { salvarTarefas }