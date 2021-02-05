import React, { useState, useEffect } from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import "../style/individual.scss";

function IndividualDisplay() {
  let { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState();

  let apiUri = "https://onebox.aserto.us:8383/api/v1/dir/users/";

  useEffect(() => {
    fetch(apiUri + id)
      .then(res => res.json())
      .then(result => {
        if (result.code === 2) {
          setError(new Error(result.message));
          setIsLoaded(true);
        } else {
          setData(result.results);
          setIsLoaded(true);
        }
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      })
  }, [id]); // placing id in the brackest causes react to run this function again on this change this is usefull for the manager link

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    let phone = Object.keys(data.identities).filter(identity => data.identities[identity].type === "PHONE")[0];
    return (
      <div className="individual-view">
        <div className="top-view">
          <div className="photo">
            <img src={data.picture} alt={data.display_name} />
          </div>
          <div className="user-details">
            <div><span className="title">Name:</span><span className="data">{data.display_name}</span></div>
            <div><span className="title">Title:</span><span className="data">{data.attr.title}</span></div>
            <div><span className="title">Department:</span><span className="data">{data.attr.department}</span></div>
            <div><span className="title">Roles:</span><span className="data">{data.applications['*'].roles.join(", ")}</span></div>
            <div><span className="title">Email:</span><span className="data">{data.email}</span></div>
            <div><span className="title">Phone Number:</span><span className="data">{phone}</span></div>
          </div>
        </div>
        {data.attr.manager !== "" && // checks for a valid manager id
          <div className="manager-link"><Link to={`/${data.attr.manager}`}>Link to Manager</Link></div>
        }
        <div className="metadata">Last Updated: {new Date(data.metadata.updated_at).toDateString()}</div>

      </div>
    );
  }
}

export default IndividualDisplay;
