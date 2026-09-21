function Filter({ filter, setFilter }) {
  return (
    <div className="filter" role="group" aria-label="Filtrar cafés">
      <button
        type="button"
        onClick={() => setFilter("all")}
        className={filter === "all" ? "filter-button active" : "filter-button"}
        aria-pressed={filter === "all"}
      >
        Todos os produtos
      </button>

      <button
        type="button"
        onClick={() => setFilter("available")}
        className={
          filter === "available" ? "filter-button active" : "filter-button"
        }
        aria-pressed={filter === "available"}
      >
        Disponíveis agora
      </button>
    </div>
  );
}

export default Filter;
