import React from 'react';
import Describe from './Describe';
import Price from './Price';
import Size from './Size';
import Stock from './Stock';
import Color from './Color';
import Category from './Category';
import Images from './Images';

// TODO: make this a stateless functional component
class Product extends React.Component {
  render() {
    let {
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
      <div className="product">
        <Images images={image_pid} name={name} />
        <Describe name={name} gender={gender} description={description} webLink={webLink} />
        <Price retailPrice={retailPrice} salesPrice={salesPrice} discount={discount} />
        <Size sizes={size} availableSizes={availableSizes} />
        <div className="product__color-stock-row">
          <Color color={color} />
          <Stock stock={stock} available={available} />
        </div>
        <Category category={category} subCategory={subCategory} />
      </div>
    );
  }
}

export default Product;
