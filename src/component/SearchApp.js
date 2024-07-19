import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import Table from "./Table";
import Pagination from "./Pagination";
import API from "./API";

const SearchApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [query, setQuery] = useState("");
  const [maxItemsPerFetch] = useState(10);
  const [validationMessage, setValidationMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      if (itemsPerPage >= 1) {
        const response = await API.fetchCities({
          query,
          currentPage,
          itemsPerPage,
        });
        setData(response.data);
        setTotalPages(Math.ceil(response.metadata.totalCount / itemsPerPage));
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("API rate limit exceeded. Waiting before retrying...");
        console.warn(error.response.data.message);
        // setValidationMessage(error.response.data.message)
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchData();
  }, [query, currentPage, itemsPerPage]);

  const handleSearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleItemsPerPageChange = (value) => {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue) || value.trim() === "" || parsedValue <= 0) {
      setValidationMessage(`Please enter a number greater than or equal to 1.`);
      setItemsPerPage(parsedValue);
    } else if (parsedValue > maxItemsPerFetch) {
      setValidationMessage(
        `Please enter a number less than or equal to ${maxItemsPerFetch}.`
      );
      setItemsPerPage(parsedValue);
    } else {
      setItemsPerPage(parsedValue);
      setCurrentPage(1);
      setValidationMessage("");
      fetchData();
    }
  };

  return (
    <div className="App">
      <h1>Search Places</h1>
      <SearchBox onSearch={handleSearch} />
      <Table data={data} loading={loading} query={query} />
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxItemsPerFetch={maxItemsPerFetch}
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
      {validationMessage && (
        <span className="warning">{validationMessage}</span>
      )}
    </div>
  );
};

export default SearchApp;
