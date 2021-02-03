import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

function ListView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);

  let apiUri = "https://onebox.aserto.us:8383/api/v1/dir/users?page.size=10&page.token="

  useEffect(() => {
    setAllData([]);
    setDisplayIndex(0);
    fetch(apiUri)
      .then(res => res.json())
      .then(result => {
        setIsLoaded(true);
        setData(result.results);
        setAllData(result.results);
        setNextPageToken(result.page.nextToken);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, []);

  function getNextPage() {
    fetch(apiUri + nextPageToken)
      .then(res => res.json())
      .then(result => {
        setData(result.results);
        let newFull = allData.concat(result.results)
        setAllData(newFull);
        setNextPageToken(result.page.nextToken);
      },
      (error) => {
        setIsLoaded(true); // maybe unneeded
        setError(error);
      });
  }

  function nextTen(event) {
    event.preventDefault();
    changeDisplayData(displayIndex + 10);
  }

  function lastTen(event) {
    event.preventDefault();
    changeDisplayData(displayIndex - 10);
  }

  function changeDisplayData(newIndex) {
    if (allData === null) return; // data doesn't exist
    if (newIndex < 0) return; // Tried to access negative index
    setIsLoaded(false);
    console.log(newIndex);
    if (allData[newIndex] === undefined) {
      getNextPage();
      setDisplayIndex(newIndex)
    } else {
      let display = allData.slice(newIndex, newIndex + 10);
      setData(display);
      setDisplayIndex(newIndex);
    }
    setIsLoaded(true);
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <ul>
          {data.map(user => {
            return (<li key={user.id}>
              <img src={user.picture} alt={user.display_name} />
              <Link to={`/${user.id}`}>{user.display_name}</Link>
            </li>)
          })}
        </ul>
        <button onClick={lastTen}>Previous</button>
        <button onClick={nextTen}>Next</button>
      </div>
    )
  }
}

export default ListView;
