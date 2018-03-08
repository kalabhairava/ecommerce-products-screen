import React from 'react';

function Color(props) {
  const { color } = props;

  return (
    <div className="color">
      <div className="color__text">Color</div>
      <div className="color__value">{color}</div>
    </div>
  );
}

export default Color;
