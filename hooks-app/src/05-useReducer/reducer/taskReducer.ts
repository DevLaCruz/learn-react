// La idea de este taskReducer es para poder poder manejar lo que está estrechamente relacionada a tareas en este caso o todos
// el imput es mas general en este caso pero si fuera un formulario, tal vez si convenga aplicar
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export const getTasksInitialSate = (): TaskState => {
  return {
    todos: [],
    completed: 0,
    pending: 0,
    length: 0,
  }
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

// action es un "objeto" que nos va a permitir definir un nuevo estado, no vamos a modificar, solamente vamos a determinar un nuevo estado
// quiere decir que no vamos a modificarlo y una vez vamos a determinar un nuevo estado este va a ser retornado y luego va a ser state: TaskState
// que va a volver a retornarse y simplemente vamos a mandar una nueva accion que va a usar el estado actual para determinar un nuevo estado
// la action no determina un nuevo estado, simplemente es una serie de valores que vamos a recibir para determinar el nuevo estado
export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      //! No hacer porque siempre tenemos que devolver un nuevo estado
      //state.todos.push(newTodo)
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };

    case "DELETE_TODO":
      const currentTodos = state.todos.filter((todo) =>todo.id !== action.payload)
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        length: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length

      };

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo)=> todo.completed).length,
        //length: updatedTodos.length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
