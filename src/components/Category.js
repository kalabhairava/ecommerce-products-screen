import React from 'react';

function Category(props) {
  const { category, subCategory } = props;

  return (
    <div className="category">
      <div className="category__text">Category</div>
      <div className="category__value">{`${subCategory}, under ${category}.`}</div>
    </div>
  );
}

export default Category;
