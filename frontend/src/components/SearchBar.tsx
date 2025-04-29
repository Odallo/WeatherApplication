// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input input-bordered flex-grow"
        disabled={isLoading}
        aria-label="City search"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
        aria-label="Search"
      >
        {isLoading ? '...' : 'GO'}
      </button>
    </form>
  );
};

export default SearchBar;