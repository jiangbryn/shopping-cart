import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
  	background: 'black',
  	color: 'white',
    border: 0,
    borderRadius: 0,
    height: 45,
    width: 250, 
  },
  root: {
    flexGrow: 1,
  },
  card: {
  	width: 250,
  	height: 480,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
}));

const Product = ({ product }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<img src={"data/products/"+product.sku+"_1.jpg"} height="320" width="230"></img>
			<CardContent>
				<Typography>
					{product.title}
				</Typography>
				<Typography>
				    {product.currencyFormat}
				    {product.price}
				</Typography>
			</CardContent>
			<CardActions>
			    <Button className={classes.button}>
			        Add to cart
			    </Button>
			</CardActions>
		</Card>
	);
};

const ProductList = ({ products }) => {
	return (
		<React.Fragment>
			<Grid container spacing={2} direction="row">
				{products.map(product =>			
					<Grid item key={product.sku}>
						<Product product={product} />
					</Grid>)
				}
			</Grid>
		</React.Fragment>
	);
};

export default ProductList;