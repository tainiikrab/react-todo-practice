import { useState } from 'react';

function AddTodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = text.trim();
        if (!value) {
            return;
        }

        onAdd(value);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2">
            <input
                type="text"
                className="form-control form-control-lg rounded-pill px-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Добавить новую задачу"
                aria-label="Новая задача"
            />

            <button
                type="submit"
                className="btn btn-primary btn-lg rounded-pill px-4"
            >
                Добавить
            </button>
        </form>
    );
}

export default AddTodoForm;