import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { deleteSelectedProductsAction } from '../../store/actions/productActions';

import { 
  Logo, 
  ProductList, 
  TotalCounter, 
  ProductForm 
} from '../';

import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();

  const onDeleteSelectedProducts = useCallback(
    () => {
      dispatch(deleteSelectedProductsAction());
    },
    [dispatch]
  );

  return (
    <div className={ styles.container }>
      <Logo />
      <div className={ styles.title }>Fridge</div>
      <ProductList />
      <div className={ styles.btnRow }>
        <button className={ styles.btn } onClick={ onDeleteSelectedProducts }>Delete Selected</button>
        <TotalCounter />
      </div>
      <ProductForm />
    </div>
  )
};

export default App;