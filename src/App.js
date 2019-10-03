import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductList from './component/ProductList'
import Size from './component/Size'
import FloatCart from './component/FloatCart'
import TopBar from './component/TopBar'

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <TopBar/>
      <Grid container spacing={2} direction="row">
        <Grid item xs={2} >
          <Size/>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products}/>
        </Grid>
        <Grid item xs={1}>
          <FloatCart />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
