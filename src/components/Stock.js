import React from 'react';

function Stock(props) {
  const { stock, available } = props;

  if (available) {
    return (
      <div className="stock">
        <div className="stock__text"> Stock </div>
        <div className="stock__value"> {stock} </div>
      </div>
    );
  } else {
    return <div className="stock__not-available">Out of stock&#x2639;</div>;
  }
}

export default Stock;
