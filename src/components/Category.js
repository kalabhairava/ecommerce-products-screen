import React from 'react';

function Category(props) {
  const { webLink, category, subCategory } = props;

  return (
    <div>
      <a className="link" href={webLink}>
        Link to this product
      </a>
      {/* <div>Category: {category}</div>
      <div>Sub Category: {subCategory}</div> */}
    </div>
  );
}

export default Category;
