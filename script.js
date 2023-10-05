import { criaTarefa } from "./components/criaTarefas/script.js"

const salvarTarefas = () => {
    const tarefasArmazenadas = []
    const liTarefas = document.querySelectorAll('.liTarefa')

    liTarefas.forEach((li) => {
        const divName = li.querySelector('.divName')
        const divValue = li.querySelector('.divValue')

        const nomeTarefa = divName.textContent.trim()
        const valorTarefa = divValue.textContent.trim()

        const textoTarefa = `${nomeTarefa} ${valorTarefa}`

        tarefasArmazenadas.push(textoTarefa)
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasArmazenadas))
};

const addTarefasSalvas = () => {
    const tarefasJSON = localStorage.getItem('tarefas')

    if (tarefasJSON) {
        const listaDeTarefas = JSON.parse(tarefasJSON)

        listaDeTarefas.forEach((textoTarefa) => {
            const [nomeTarefa, valorTarefa] = textoTarefa.split(' ')
            criaTarefa(nomeTarefa, valorTarefa)
        })
    }
}

addTarefasSalvas()

export { salvarTarefas }