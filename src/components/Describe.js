import React from 'react';

function Describe(props) {
  const { name, gender, description } = props;
  return (
    <div>
      {name}
      <span>for {gender}</span>
      <div>{description}</div>
    </div>
  );
}

export default Describe;
