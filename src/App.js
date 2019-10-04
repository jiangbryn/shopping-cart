import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductList from './component/ProductList'
import Size from './component/Size'
import FloatCart from './component/FloatCart'

const useStyles = makeStyles(theme => ({
  outerContainer: {
    width: 1500,
    marginTop: 80,
  },
}));

const useAdded = () => {
  const [added, setAdded] = useState([]);
  const toggle = (x) => {
    if(!added.includes(x))
      setAdded([x].concat(added));
  };
  return [ added, toggle];
}

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [added, toggle] = useAdded();
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
      <CssBaseline />
      <FloatCart products={products} state={{added, toggle}}/>
      <Container className={classes.outerContainer}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={3}>
            <Size/>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products} state={{added, toggle}}/>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
