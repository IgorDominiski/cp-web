import { useEffect, useState } from 'react'

type Todo = {
  id: string
  title: string
  done: boolean
}

type HeaderProps = {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-white/90">{subtitle}</p> : null}
      </div>
    </header>
  )
}

type TodoFormProps = {
  onAdd(todoTitle: string): void
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Adicione uma tarefa nova..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  )
}

type TodoItemProps = {
  todo: Todo
  onToggle(id: string): void
  onRemove(id: string): void
}

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between rounded border border-gray-200 px-3 py-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="size-4"
        />
        <span className={todo.done ? "line-through text-gray-500" : ""}>{todo.title}</span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        Remove
      </button>
    </li>
  )
}

type TodoListProps = {
  items: Todo[]
  onToggle(id: string): void
  onRemove(id: string): void
}

function TodoList({ items, onToggle, onRemove }: TodoListProps) {
  if (items.length === 0) {
    return <p className="text-gray-500">No tasks yet. Add your first one!</p>
  }
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "done">("all")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("todos-v1")
      if (raw) setTodos(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem("todos-v1", JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    const newTodo: Todo = { id: crypto.randomUUID(), title, done: false }
    setTodos((prev) => [newTodo, ...prev])
  }

  function toggleTodo(id: string) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function addSample() {
    const samples = [
      "Estudar React",
      "Praticar Tailwind",
      "Enviar checkpoint",
    ]
    const created: Todo[] = samples.map((title) => ({ id: crypto.randomUUID(), title, done: false }))
    setTodos((prev) => [...created, ...prev])
  }

  function toggleAll() {
    const allDone = todos.every((t) => t.done)
    setTodos((prev) => prev.map((t) => ({ ...t, done: !allDone })))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done))
  }

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  )

  return (
    <div className="min-h-screen">
      <Header title="Lista de tarefas" subtitle="Igor, Murilo Canestri, Murillo Akira" />
      <main className="mx-auto max-w-3xl p-4">
        <section className="mx-auto mt-6 rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-blue-600/10 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-white shadow">📝</span>
            <div>
              <h2 className="text-lg font-semibold">Suas tarefas</h2>
              <p className="text-sm text-gray-500">Organize o que precisa fazer hoje</p>
            </div>
          </div>

          <div className="mt-5">
            <TodoForm onAdd={addTodo} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={addSample} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-emerald-700">
              ➕ Adicionar exemplo
            </button>
            <button onClick={toggleAll} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-indigo-700">
              ✔️ Marcar todos
            </button>
            <button onClick={clearCompleted} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-rose-700">
              🧹 Limpar concluídos
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{todos.length} tarefas</span>
            </p>
            <div className="inline-flex overflow-hidden rounded-lg border border-gray-200 bg-gray-100 p-0.5">
              {(["all", "active", "done"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "px-3 py-1.5 text-sm capitalize transition " +
                    (filter === f ? "rounded-md bg-white text-blue-700 shadow" : "text-gray-700 hover:text-gray-900")
                  }
                >
                  {f === "all" ? "Todos" : f === "active" ? "Ativos" : "Concluídos"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            {visible.length === 0 ? (
              <div className="rounded-lg border border-dashed border-blue-300 bg-blue-50 px-6 py-10 text-center text-blue-700">
                Nenhuma tarefa no filtro atual. Adicione uma nova acima.
              </div>
            ) : (
              <TodoList items={visible} onToggle={toggleTodo} onRemove={removeTodo} />
            )}
          </div>
        </section>
        <footer className="mx-auto mt-6 text-center text-xs text-gray-500">
           {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  )
}

export default App
