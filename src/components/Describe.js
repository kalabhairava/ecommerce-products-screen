import React from 'react';

function Describe(props) {
  const { name, gender, description } = props;
  return (
    <div className="description">
      <div className="description__title">
        {name}
        <span className="description__title--italic--muted"> for {gender}</span>
      </div>
      <div className="description__subtitle">{description}</div>
    </div>
  );
}

export default Describe;
