import React, { useState, useEffect } from "react";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "/") {
          event.preventDefault();
          document.getElementById("searchInput").focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="search-box">
      <input
        id="searchInput"
        type="text"
        placeholder="Start searching"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={false}
      />
    </div>
  );
};

export default SearchBox;
