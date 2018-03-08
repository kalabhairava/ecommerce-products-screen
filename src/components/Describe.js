import React from 'react';

function Describe(props) {
  const { name, gender, description, webLink } = props;
  return (
    <div className="description">
      <div className="description__title">
        <a href={webLink}>{name}</a>
        {/* <span className="description__title--italic--muted"> for {gender}</span> */}
      </div>
      <div className="description__subtitle">{description}</div>
    </div>
  );
}

export default Describe;
