import React from 'react';

const Table = ({ data, loading, query }) => {
  const renderTable = () => {
    if (!query) {
      return (
        <tr>
          <td colSpan="3">Start searching</td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="3">No result found</td>
        </tr>
      );
    }

    return data.map((place, index) => (
      <tr key={place.id}>
        <td><b>{index + 1}</b></td>
        <td>{place.city}</td>
        <td><img src={`https://flagsapi.com/${place.countryCode}/flat/64.png`} alt={place.country} /></td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
