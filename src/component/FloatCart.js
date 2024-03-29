import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import 'firebase/auth';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <div color="info">
    Welcome, {user.displayName}
    <Button color="secondary" onClick={() => firebase.auth().signOut()}>
      Log out
    </Button>
  </div>
);
const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const drawerWidth = 400;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: 'black',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: 'black',
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'black',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  checkoutButton: {
    background: 'lightgrey',
    color: 'white',
    borderRadius: 2,
    margin: 1,
    padding: 1,
    size: 'large',
  },
}));

const useCardStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: 300,
    height: 100,
    margin: 10,
  },
  outerBox: {
    display: 'flex',
    direction: 'column',
    justify: 'space-between',
    padding: 10,
  },
  details: {
    display: 'flex',
    direction: 'column',
    margin: 2,
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const useListStyles = makeStyles(theme => ({
  outerBox: {
    display: 'flex',
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    margin: 2,
  },
}));

const CartCard = ({ item, products, state, invt }) => {
  const classes = useCardStyles();
  const handleDelete = () => {
    let saveInvent = invt.inventory;
    saveInvent[item.product.sku][item.size] += 1;
    invt.setInventory(saveInvent);  
    item.product[item.size] += 1;
    let addList = state.added;
    const index = addList.findIndex(i=>i.product.sku === item.product.sku && i.size===item.size);

    if (index > -1) {
      addList[index].quantity -= 1;
      if (addList[index].quantity === 0) {
        addList.splice(index,1);
      }
    }
    state.setAdded(addList.slice(0));    
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card}>
        <Box className={classes.outerBox}>
          <Box className={classes.details}>
            <img src={"data/products/"+item.product.sku+"_1.jpg"} height="80" width="55"></img>
          </Box>
          <Box className={classes.details}>
            <Box className={classes.content}>
              <Typography variant="body2">
                {item.product.title}
              </Typography>
              <Typography variant="body2">
                {item.size}
                {item.quantity}
              </Typography>
              <Typography variant="body2">
                {item.product.currencyFormat}
                {item.product.price}
              </Typography>
            </Box>
          </Box>
          <IconButton
            aria-label="delete item"
            edge="end"
            onClick={handleDelete}
          >
            <img src={"data/icons/sprite_delete-icon.png"} height="12" width="18"></img>
          </IconButton>
        </Box>
      </Card>
    </React.Fragment>
  );
};

const CartList = ({ products, state, invt }) => {
  const classes = useListStyles();
  return (
    <React.Fragment>
      <Box className={classes.outerBox}>
        {JSON.stringify(state.added) != "{}" ? 
          state.added.map(item =>      
            <Box key={item.product.sku+"cart"} className={classes.innerBox}>
              <CartCard item={item} state={state} products={products} invt={invt} />
            </Box>) :               
          <Typography variant="body2">
            Your cart is empty!
          </Typography>

        }
      </Box>
    </React.Fragment>
  );
};

const FloatCart = ({ products, state, db, user, invt }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    if(user != null) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCheckout = () => {
    const addList = state.added;
    if(addList != null && addList.length != 0) {
      const inventory = invt.inventory;
      let sum = 0;
      addList.forEach(item => {
        sum += item.product.price * item.quantity;
      });
      //console.log(inventory);
      /*
      const newPostKey = db
        .ref("inventory")
        .set(inventory);
      */
      state.setAdded({});
      window.alert("The total is $"+sum);
    } else {
      window.alert("Cart is empty!");
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <img src={"data/icons/bag-icon.png"} height="25" width="25"></img>
          </IconButton>
        </Toolbar>
        {!user ? <SignIn/> : <Welcome user={user}/>}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            aria-label="close drawer"
            edge="end"
            onClick={handleDrawerClose}
          >
            <img src={"data/icons/sprite_delete-icon.png"}></img>
          </IconButton>
        </div>
        <CartList products={products} state={state} invt={invt} />
        <Button className={classes.checkoutButton} onClick={handleCheckout} > Check Out </Button>
      </Drawer>
    </React.Fragment>
  );
};

export default FloatCart;