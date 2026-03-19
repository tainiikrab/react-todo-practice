import { useEffect, useMemo, useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

const getInitialTodos = () => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
};

const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'dark';
};

function App() {
    const [todos, setTodos] = useState(getInitialTodos);
    const [filter, setFilter] = useState('all');
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const activeCount = useMemo(
        () => todos.filter((todo) => !todo.completed).length,
        [todos]
    );

    const filteredTodos = useMemo(() => {
        if (filter === 'active') {
            return todos.filter((todo) => !todo.completed);
        }

        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }

        return todos;
    }, [todos, filter]);

    const addTodo = (text) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            completed: false
        };

        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const clearTodos = () => {
        setTodos([]);
    };

    return (
        <div className="min-vh-100 py-4 py-md-5">
            <div className="container" style={{ maxWidth: '860px' }}>
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4">
                            <div>
                                <h1 className="h2 mb-1 fw-bold">Менеджер задач</h1>
                                <div className="text-body-secondary">
                                    Осталось задач: {activeCount}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 40, height: 40 }}
                                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                            >
                                <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
                            </button>
                        </div>

                        <div className="mb-4">
                            <AddTodoForm onAdd={addTodo} />
                        </div>

                        <div className="mb-4">
                            <TodoFilters
                                filter={filter}
                                onFilterChange={setFilter}
                            />
                        </div>

                        {filteredTodos.length === 0 ? (
                            <div className="border rounded-4 p-4 text-center bg-body-tertiary">
                                <div className="fw-semibold mb-1">
                                    {filter === 'all'
                                        ? 'Задач пока нет'
                                        : filter === 'active'
                                            ? 'Нет активных задач'
                                            : 'Нет выполненных задач'}
                                </div>
                                <div className="text-body-secondary">
                                    Добавь первую задачу через форму выше.
                                </div>
                            </div>
                        ) : (
                            <ul className="list-group list-group-flush rounded-4 overflow-hidden border">
                                {filteredTodos.map((todo) => (
                                    <TodoItem
                                        key={todo.id}
                                        task={todo}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                    />
                                ))}
                            </ul>
                        )}

                        {todos.length > 0 && (
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger w-100 rounded-pill py-2"
                                    onClick={clearTodos}
                                >
                                    Очистить всё
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;