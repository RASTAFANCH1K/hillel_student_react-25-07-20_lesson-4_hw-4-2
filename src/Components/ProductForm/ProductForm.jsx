import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addProductAction } from '../../store/actions/productActions';
import { categoryMocks, defaultCategory } from '../../mocks';
import { isNumUtil } from '../../utils/productUtils'

import styles from './ProductForm.module.scss';

const ProductForm = () => {
  const defaultState = {
    name: '',
    description: '',
    category: defaultCategory,
    price: ''
  };

  const [productFormState, setProductFormState] = useState(defaultState);

  const dispatch = useDispatch();

  const onAddProduct = useCallback(
    e => {
      e.preventDefault();

      const { name, description, category, price } = productFormState

      if (name && description && category && price > 0) {
        dispatch(addProductAction(productFormState));
      }

      setProductFormState(defaultState);
    },
    [productFormState, dispatch, setProductFormState, defaultState],
  );

  const onChange = useCallback(
    ({ target }) => setProductFormState({
      ...productFormState,
      [target.name]: target.value
    }),
    [productFormState, setProductFormState],
  );

  const onChangePrice = useCallback(
    ({ target }) => {
      const value = target.value.replace(',', '.');

      if (!isNumUtil(value)) return;

      return setProductFormState({
        ...productFormState,
        [target.name]: target.value
      })
    },
    [productFormState]
  );

  const { name, description, category, price } = productFormState;

  return (
    <div>
      <form onSubmit={ onAddProduct }>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Name"
            name="name"
            value={ name }
            onChange={ onChange }
          />
        </div>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Description"
            name="description"
            value={ description }
            onChange={ onChange }
          />
        </div>
        <div className={ styles.groups }>
          <select 
            className={ `${ styles.control } ${ styles.select }` }
            name="category"
            value={ category }
            onChange={ onChange }
            >
            { categoryMocks.map(({ id, name }) => <option key={ id } value={ name }>{ name }</option>) }
          </select>
        </div>
        <div className={ styles.groups }>
          <input 
            className={ styles.control }
            placeholder="Price"
            name="price"
            value={ price }
            onChange={ onChangePrice }
          />
        </div>
        <button className={ styles.btn } type="submit">Add Product</button>
      </form>
    </div>
  )
};

export default ProductForm;