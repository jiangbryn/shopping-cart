import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductList from './component/ProductList'
import Size from './component/Size'
import FloatCart from './component/FloatCart'

import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA29xTosIJvIdvfplak40XFQoWn-OejJ1w",
  authDomain: "shopping-cart-2ec80.firebaseapp.com",
  databaseURL: "https://shopping-cart-2ec80.firebaseio.com",
  projectId: "shopping-cart-2ec80",
  storageBucket: "shopping-cart-2ec80.appspot.com",
  messagingSenderId: "865774923914",
  appID: "1:865774923914:web:b1cc91d367e38e53babd73",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const useStyles = makeStyles(theme => ({
  outerContainer: {
    width: 1500,
    marginTop: 80,
  },
}));

const useAdded = () => {
  const [added, setAdded] = useState({});
  const toggle = (product, size) => {
    if(product[size] > 0)
      setAdded([product].concat(added));
  };
  return [ added, toggle, setAdded];
}

const App = () => {
  const classes = useStyles();
  const [products, setProducts] = useState({});
  const [added, toggle, setAdded] = useAdded();
  const [size, setSize] = useState("S");
  const items = Object.values(products);
  const stockItems = items.filter(product => product[size] > 0);
  useEffect(() => {
    const fetchProduct = async () => {
      const responseData = await fetch('./data/products.json');
      const data = await responseData.json();
      //const responseInven = await fetch('./data/inventory.json');
      //const inventory = await responseInven.json();
      const handleData = snap => {
        let result = {};
        Object.keys(data).forEach(p=>{result[p] = Object.assign(data[p],snap.val()[p])});
        setProducts(result);
      };
      db.ref('inventory').on('value', handleData, error => alert(error));
      return () => { db.ref('inventory').off('value', handleData); };
    };
    fetchProduct();
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <FloatCart products={added} state={{toggle, setAdded}}/>
      <Container className={classes.outerContainer}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={3}>
            <Size state={{size, setSize}}/>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={stockItems} 
              state={{added, toggle}}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
