import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
} 

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if( newTaskTitle.length === 0 ){
      alert('Digite uma tarefa')
    }
    //Procurei muito até descobrir que tinha que criar a variavel com as propriedades da task{id, title, isComplete}
    //Pois eu estava tentando adicionar somente o titulo, mas é preciso adicionar todas as propriedades
    /* const newTask ={
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }  */
    //consegui achar a manipulação no stackoverflow
    //posso passar desse jeito ou [...tasks, newTask]
    setTasks(tasks => [...tasks, {id: Math.random(), title: newTaskTitle, isComplete: false}]);
    //somente para limpar o campo do formulário
    setNewTaskTitle('') 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const checkTask = tasks.map(task => task.id === id ? {
      /*não funciona passar o task.isComplete: false, pra isso é preciso usar 
      a negação para passar o valor contrário ao anterior*/
      ...task, isComplete: !task.isComplete
    }: task)
    setTasks(checkTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //Conclui que era pra usar o método filter, mas não consegui completar o código sozinho.
    /*Aqui o filter vai pegar a lista de task e retornar todos os itens que são diferentes da id que foi clicada,
    pois o id que foi clicado na aplicação é aquele que tem q ser removido*/
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            /* componente controlado */
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}