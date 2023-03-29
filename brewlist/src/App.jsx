import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Card from './Components/Card';

function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
      const data = await response.json();
      setList(data);
      setFilteredResults(data);
    };

    fetchBreweries().catch(console.error);
  }, []);

  const filterList = (search, filterOption) => {
    let filtered = [];
    if (list.length != 1) {
      switch (filterOption) {
        case 'city':
          filtered = list.filter((brewery) =>
            brewery.city.toLowerCase().includes(search.toLowerCase())
          );
          break;
        case 'state':
          filtered = list.filter((brewery) =>
            brewery.state.toLowerCase().includes(search.toLowerCase())
          );
          break;
        case 'country':
          filtered = list.filter((brewery) =>
            brewery.country.toLowerCase().includes(search.toLowerCase())
          );
          break;
        case 'type':
          filtered = list.filter((brewery) =>
            brewery.brewery_type
              .toLowerCase()
              .includes(search.toLowerCase())
          );
          break;
        default:
          filtered = list.filter((brewery) =>
            brewery.name.toLowerCase().includes(search.toLowerCase())
          );
          break;
      }
    }
    setFilteredResults(filtered);
  };

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setSearchInput(searchInput);
    filterList(searchInput, selectedFilter);
  };

  const handleFilterChange = (e) => {
    const filterOption = e.target.value;
    setSelectedFilter(filterOption);
    filterList(searchInput, selectedFilter);
  };

  return (
    <div className="App">
      <Header breweries={filteredResults}/>
      <div className="search">
        <input
          onChange={handleSearchInput}
          type="text"
          placeholder="Search"
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="name">Name</option>
          <option value="type">Brewery Type</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="country">Country</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((brewery) => (
            <Card brewery={brewery} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
