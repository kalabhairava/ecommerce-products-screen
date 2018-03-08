import React from 'react';

function Size(props) {
  let { sizes, availableSizes } = props;

  sizes = sizes.split(',');
  availableSizes = availableSizes.split(',');

  return (
    <div className="size">
      {sizes.map((size) => (
        <span
          className={
            availableSizes.includes(size) ? 'size__item' : 'size__item size__item--disabled'
          }
        >
          {size}
        </span>
      ))}
    </div>
  );
}

export default Size;
