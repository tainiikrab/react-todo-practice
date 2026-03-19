function TodoItem({ task, onToggle, onDelete }) {
    return (
        <li className="list-group-item d-flex align-items-center gap-3 py-3 px-3 px-md-4">
            <input
                type="checkbox"
                className="form-check-input m-0"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label={`Отметить задачу ${task.text}`}
            />

            <span
                className={`flex-grow-1 fs-5 ${
                    task.completed ? 'text-decoration-line-through text-body-secondary' : ''
                }`}
            >
        {task.text}
      </span>

            <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                onClick={() => onDelete(task.id)}
            >
                Удалить
            </button>
        </li>
    );
}

export default TodoItem;