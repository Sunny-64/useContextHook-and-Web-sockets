import './App.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TodoState from './context/todo/todoStates'

function App() {

  return (
      <TodoState>
          <AddTask />
          <Tasks />
      </TodoState>
  )
}

export default App
