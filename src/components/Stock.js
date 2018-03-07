import React from 'react';

function Stock(props) {
  const { stock, available } = props;

  return (
    <div>
      Stock: {stock}
      Available: {available.toString()}
    </div>
  );
}

export default Stock;
