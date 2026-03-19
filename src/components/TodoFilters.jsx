function TodoFilters({ filter, onFilterChange }) {
    const items = [
        { key: 'all', label: 'Все' },
        { key: 'active', label: 'Активные' },
        { key: 'completed', label: 'Выполненные' }
    ];

    return (
        <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-sm-center">
            <div className="fw-semibold">Фильтр задач</div>

            <div className="btn-group" role="group" aria-label="Фильтры задач">
                {items.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className={`btn ${filter === item.key ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => onFilterChange(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoFilters;