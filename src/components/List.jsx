import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import "../style/list.scss";

function ListView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [maxEntries, setMaxEntries] = useState(-1);
  const [nameFilter, setNameFilter] = useState("");

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  let apiUri = "https://onebox.aserto.us:8383/api/v1/dir/users?"

  useEffect(() => {
    setAllData([]);
    setPage(0);
    let entries = -1;
    let loadData = [];
    fetch(apiUri)
      .then(res => res.json())
      .then(result => {
        setMaxEntries(result.page.total_size);
        loadData = result.results;
        loadData.sort((a, b) => a.display_name.localeCompare(b.display_name));
        setAllData(loadData);
        setFilteredData(loadData);
        let display = loadData.slice(0, 10);
        setData(display);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true); // maybe unneeded
      });
  }, []);

  function nextTen(event) {
    event.preventDefault();
    changeDisplayData(page +  1);
  }

  function lastTen(event) {
    event.preventDefault();
    changeDisplayData(page - 1);
  }

  function changeDisplayData(newPage) {
    if (filteredData === null) return; // data doesn't exist
    if (newPage < 0) return; // Tried to access negative index
    setIsLoaded(false);
    let index = newPage * 10
    let display = filteredData.slice(index, index + 10);
    setData(display);
    setPage(newPage);
    setIsLoaded(true);
  }

  function changeNameFilter(event) {
    event.preventDefault();
    if (event.target.value === "") {
      setFilteredData(allData);
    } else {
      let newData = allData.filter(individual => individual.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredData(newData);
    }

    setPage(0);
  }

  useEffect(() => {
    changeDisplayData(page)
  }, [page, filteredData]);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="list-view">
        <input className="name-filter" type="text" onChange={changeNameFilter} placeHolder="filter by name" />
        <ul>
          {data.map(user => {
            return (<li key={user.id}>
              <img src={user.picture} alt={user.display_name} />
              <div className="preview">
                <Link to={`/${user.id}`}>{user.display_name}</Link>
                <div>{user.attr.title}</div>
                <div>Department of {user.attr.department}</div>
              </div>
            </li>)
          })}
        </ul>
        <div className="page-nav">
          <div className="page-back">
            {page !== 0 &&
              <button onClick={lastTen}>Previous</button>
            }
          </div>
          <div className="page-number">{page + 1}</div>
          <div className="page-next">
            {(page + 1) * 10 < filteredData.length &&
              <button onClick={nextTen}>Next</button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ListView;
