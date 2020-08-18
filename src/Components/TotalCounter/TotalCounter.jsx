import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import styles from './TotalCounter.module.scss';

const TotalCounter = () => {
  const products = useSelector((state) => state.products, shallowEqual);
  const { productList, total, selectedTotal } = products;

  return (
    <div className={ styles.counterWrap }>
      <div className={ styles.totalWrap }>
        <div className={ `${ styles.total } ${ styles.totalTitle }` }>Total:</div>
        <div className={ `${ styles.total } ${ styles.totalNum }` }>{ total }</div>
      </div>
      <div className={ styles.totalWrap }>
        <div className={ `${ styles.total } ${ styles.totalTitle }` }>Selected Total:</div>
        <div className={ `${ styles.total } ${ styles.totalNum }` }>{ selectedTotal }</div>
      </div>
      <div className={ styles.totalWrap }>
        <div className={ `${ styles.total } ${ styles.totalTitle }` }>Amount:</div>
        <div className={ `${ styles.total } ${ styles.totalNum }` }>{ productList.length }</div>
      </div>
    </div>
  )
};

export default TotalCounter;