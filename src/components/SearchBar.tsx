import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import mapboxService from '../services/mapboxService';
import { Location } from '../types';

interface SearchBarProps {
  placeholder: string;
  onLocationSelect: (location: Location) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder, 
  onLocationSelect,
  initialValue = ''
}) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await mapboxService.searchLocation(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelectLocation = (location: Location) => {
    setQuery(location.placeName || location.name);
    onLocationSelect(location);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleClearInput = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={suggestionRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {query && (
          <button
            onClick={handleClearInput}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectLocation(suggestion)}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-sm text-gray-500">{suggestion.placeName}</div>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;