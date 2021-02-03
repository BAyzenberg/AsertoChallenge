import React from 'react';
import {
  useParams
} from 'react-router-dom';

function IndividualDisplay() {
  let { id } = useParams();

  return (
    <div>
      <h1>IndividualDisplay</h1>
      <h2>{id}</h2>
    </div>
  )
}

export default IndividualDisplay;
