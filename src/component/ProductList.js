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
  sizeButton: {
  	background: 'lightgrey',
  	color: 'black',
    borderRadius: 2,
    margin: 1,
    padding: 1,
    size: 'small',
  },
  addButton: {
  	background: 'black',
  	color: 'white',
    borderRadius: 0,
    height: 45,
    width: 220, 
  },
  root: {
    flexGrow: 1,
  },
  card: {
  	width: 250,
  	height: 480,
    //padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    marginBottom: 15,
    marginTop: 5,
    position: 'relative',
  },
}));

const Product = ({ product, user, state, invt }) => {
	const classes = useStyles();
	const [selectSize, setSelectSize] = useState("S");
	const handleAddCart = () => {
		if(product[selectSize] > 0){
			let saveInvent = invt.inventory;
			saveInvent[product.sku][selectSize] -= 1;
			product[selectSize] -= 1;
			invt.setInventory(saveInvent);	
			let addList = state.added;
			const index = addList.findIndex(item=>item.product.sku === product.sku && item.size===selectSize);
			
			if (index > -1) {
      	addList[index].quantity+=1;
		  } else {
  			addList.push({
	        product,
	        quantity: 1,
	        size: selectSize,
	    	})
    	}
    	state.setAdded(addList.slice(0));
			//console.log(state.added);
		}
	};
	return (
		<Card className={classes.card}>
			<img src={"data/products/"+product.sku+"_1.jpg"} height="280" width="200"></img>
			<div style={{margin: 3, position: 'absolute', top: 300, right: 0, left: 0}}>
				<Typography>
					{product.title}
				</Typography>
			</div>
			<div style={{margin: 2, position: 'absolute', top:330, right: 0, left: 0}}>
				<Typography>
				    {product.currencyFormat}
				    {product.price}
				</Typography>
			</div>
			<div style={{position: 'absolute', top:360, right: 0, left: 0}}>
				<Button className={classes.sizeButton}
				onClick={()=>setSelectSize("S")}
				>
					S
				</Button>
				<Button className={classes.sizeButton}
				onClick={()=>setSelectSize("M")}
				>
					M
				</Button>
				<Button className={classes.sizeButton}
				onClick={()=>setSelectSize("L")}
				>
					L
				</Button>
				<Button className={classes.sizeButton}
				onClick={()=>setSelectSize("XL")}
				>
					XL
				</Button>
			</div>
			<div style={{position: 'absolute', top:420, right: 0, left: 0}}>
				<Button className={classes.addButton} onClick={handleAddCart}>
			        Add to cart
			    </Button>
		    </div>
		</Card>
	);
};

const ProductList = ({ products, state, user, invt }) => {
	return (
		<React.Fragment>
			<Grid container spacing={2} direction="row">
				{products.map(product =>			
					<Grid item key={product.sku}>
						<Product product={product} user={user} state={state} invt={invt} />
					</Grid>)
				}
			</Grid>
		</React.Fragment>
	);
};

export default ProductList;