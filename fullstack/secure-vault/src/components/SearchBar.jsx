function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search files and folders..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search files and folders"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          x
        </button>
      )}
    </div>
  );
}

export default SearchBar;
