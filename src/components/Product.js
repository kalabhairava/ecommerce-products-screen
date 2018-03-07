import React from 'react';
import Describe from './Describe';
import Price from './Price';
import Size from './Size';
import Stock from './Stock';
import Color from './Color';

class Product extends React.Component {
  state = {
    currentImgSrc: ''
  };

  render() {
    let {
      id,
      name,
      description,
      image_pid,
      salesPrice,
      retailPrice,
      discount,
      color,
      size,
      availableSizes,
      stock,
      available,
      category,
      subCategory,
      gender,
      webLink
    } = this.props;

    const style = {
      margin: '20px',
      border: '1px solid black'
    };
    return (
      <div style={style}>
        {/* <img src={image_pid[0]} /> */}
        <Describe name={name} gender={gender} description={description} />
        <Price retailPrice={retailPrice} salesPrice={salesPrice} discount={discount} />
        <Size size={size} availableSizes={availableSizes} />
        <Color color={color} />
        <Stock stock={stock} available={available} />
        {/*Think of an awesome way of displaying link, category, and subcategory*/}
      </div>
    );
  }
}

export default Product;
