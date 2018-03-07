import React from 'react';

function Size(props) {
  const { size, availableSizes } = props;

  return (
    <div>
      Sizes: {size}
      Available Sizes: {availableSizes}
    </div>
  );
}

export default Size;
