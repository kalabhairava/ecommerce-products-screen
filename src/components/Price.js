import React from 'react';

function Price(props) {
  const { retailPrice, salesPrice, discount } = props;
  const discountAmount = retailPrice - salesPrice;
  const discountPercentage = Math.floor(discountAmount / retailPrice * 100);

  return (
    <div>
      <span>{retailPrice}</span>
      {' ' + salesPrice}
      <span>{`(-${discountPercentage}%), You save ₹${discountAmount}`}</span>
    </div>
  );
}

export default Price;
