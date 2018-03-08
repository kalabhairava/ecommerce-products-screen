import React from 'react';

function Price(props) {
  const { retailPrice, salesPrice, discount } = props;
  const discountAmount = retailPrice - salesPrice;
  const discountPercentage = Math.floor(discountAmount / retailPrice * 100);

  return (
    <div className="price">
      <span className="price__retail">₹{retailPrice}</span>
      <span className="price__sales"> ₹{salesPrice}</span>
      <span className="price__savings">
        {` (-${discountPercentage}%), You save ₹${discountAmount}`}
      </span>
    </div>
  );
}

export default Price;
