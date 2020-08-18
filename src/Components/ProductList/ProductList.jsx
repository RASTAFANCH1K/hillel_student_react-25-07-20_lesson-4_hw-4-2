import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { ProductItem } from '../';

import styles from './ProductList.module.scss';

const ProductList = () => {
  const productList = useSelector(state => state.products.productList, shallowEqual);

  return (
    <div className={ styles.list }>
      <div className={ styles.titles }>
        <div className={ styles.title }>Product</div>
        <div className={ styles.title }>Description</div>
        <div className={ styles.title }>Category</div>
        <div className={ styles.title }>Price</div>
        <div className={ styles.title }></div>
      </div>
      { productList.map(product => <ProductItem key={ product.id } product={ product } />) }
    </div>
  )
};

export default ProductList;