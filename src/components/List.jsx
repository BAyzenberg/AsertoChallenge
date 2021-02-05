import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import "../style/list.scss";

function ListView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  let apiUri = "https://onebox.aserto.us:8383/api/v1/dir/users?page.size=10&page.token="

  useEffect(() => {
    setAllData([]);
    setPage(0);
    fetch(apiUri)
      .then(res => res.json())
      .then(result => {
        setData(result.results);
        setIsLoaded(true);
        setAllData(result.results);
        setNextPageToken(result.page.next_token);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, []);

  // TODO: maybe able to refactor above and below to combine
  function getNextPage() {
    fetch(apiUri + nextPageToken)
      .then(res => res.json())
      .then(result => {
        setData(result.results);
        let newFull = allData.concat(result.results)
        setAllData(newFull);
        setNextPageToken(result.page.next_token);
      },
      (error) => {
        setError(error);
        setIsLoaded(true); // maybe unneeded
      });
  }

  function nextTen(event) {
    event.preventDefault();
    changeDisplayData(page +  1);
  }

  function lastTen(event) {
    event.preventDefault();
    changeDisplayData(page - 1);
  }

  function changeDisplayData(newPage) {
    if (allData === null) return; // data doesn't exist
    if (newPage < 0) return; // Tried to access negative index
    setIsLoaded(false);
    let index = newPage * 10
    if (allData[index] === undefined) {
      getNextPage();
      setPage(newPage)
    } else {
      let display = allData.slice(index, index + 10);
      setData(display);
      setPage(newPage);
    }
    setIsLoaded(true);
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="list-view">
        <ul>
          {data.map(user => {
            return (<li key={user.id}>
              <img src={user.picture} alt={user.display_name} />
              <Link to={`/${user.id}`}>{user.display_name}</Link>
            </li>)
          })}
        </ul>
        <div className="page-nav">
          <div className="page-back">
            <button onClick={lastTen}>Previous</button>
          </div>
          <div className="page-number">{page + 1}</div>
          <div className="page-next">
            <button onClick={nextTen}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListView;
