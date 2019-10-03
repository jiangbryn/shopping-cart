import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
  	background: 'lightgrey',
  	color: 'black',
  	border: 1,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
}));

const Size = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<div margin="auto">
				<Button className={classes.button}>XS</Button>
			    <Button className={classes.button}>S</Button>
			    <Button className={classes.button}>M</Button>
			    <Button className={classes.button}>L</Button>
			    <Button className={classes.button}>XL</Button>
			    <Button className={classes.button}>XXL</Button>
		    </div>
		</React.Fragment>
	);
};

export default Size;