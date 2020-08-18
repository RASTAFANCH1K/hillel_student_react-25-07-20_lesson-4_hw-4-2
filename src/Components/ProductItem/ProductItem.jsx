import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { categoryMocks } from '../../mocks';
import { deleteProductAction, updateProductAction } from '../../store/actions/productActions';

import styles from './ProductItem.module.scss';

const ProductItem = ({ product }) => {
  const defaultState = {
    id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    selected: false,
    edited: false
  };

  const [productItemState, setProductItemState] = useState(defaultState);
  const dispatch = useDispatch();

  const onDeleteProduct = useCallback(
    e => {
      e.stopPropagation();

      dispatch(deleteProductAction(product));
    },
    [dispatch, product]
  );

  const onSelectProduct = useCallback(
    () => {
      dispatch(updateProductAction({
        ...product,
        selected: !product.selected,
      }));

      setProductItemState(defaultState);
    },
    [dispatch, product, setProductItemState, defaultState]
  );

  const onEditProduct = useCallback(
    e => {
      e.stopPropagation();
      !productItemState.id
        ? setProductItemState({ ...product, edited: true })
        : setProductItemState(defaultState);
    },
    [productItemState, setProductItemState, product, defaultState]
  );

  const onSaveProduct = useCallback(
    e => {
      e.stopPropagation();

      if (!productItemState.id) return;

      dispatch(updateProductAction({
        ...productItemState,
        edited: false
      }));

      setProductItemState(defaultState);
    },
    [productItemState, dispatch, setProductItemState, defaultState]
  );

  const onInputClick = useCallback(
    e => e.stopPropagation(),
    []
  );

  const onChange = useCallback(
    e => {
      setProductItemState({
        ...productItemState,
        [e.target.name]: e.target.value
      })
    },
    [productItemState]
  );

  const productItem = productItemState.id ? productItemState : product;

  const { name, description, category, price, selected, edited } = productItem;

  return (
    <div
      className={ selected ? styles.itemSelected : styles.items }
      onClick={onSelectProduct}
    >
      {
        selected && edited
          ? <input name="name" value={ name } onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ name }</div>
      }
      {
        selected && edited
          ? <input name="description" value={ description } onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ description }</div>
      }
      {
        selected && edited
          ? <select
              name="category"
              value={ category }
              onClick={ onInputClick } 
              onChange={ onChange }
            >
              { categoryMocks.map(({ id, name }) => <option key={ id } value={ name }>{ name }</option>) }
            </select>
          : <div className={ styles.item }>{ category }</div>
      }
      {
        selected && edited
          ? <input name="price" value={ price } type="number" onClick={ onInputClick } onChange={ onChange } />
          : <div className={ styles.item }>{ price }</div>
      }
      <div className={ styles.item }>
        {
          selected 
            ? <div>
                <button className={ styles.btn } onClick={ onEditProduct }>Edit</button>
                <button className={ styles.btn } onClick={ onSaveProduct }>Save</button>
                <button className={ styles.btn } onClick={ onDeleteProduct }>Delete</button>
              </div>  
            : <button className={ styles.btn } onClick={ onDeleteProduct }>Delete</button>
        }
      </div>
    </div>
  )
};

ProductItem.defaultProps = {
  product: {}
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string
  })
};

export default ProductItem;