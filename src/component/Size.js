import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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

const Size = ({state}) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography>
				Size:
			</Typography>
			<div>
			    <Button className={classes.button} 
			    	onClick={() => state.setSize("S")}
			    >
			    	S
			    </Button>
			    <Button className={classes.button} 
			    	onClick={() => state.setSize("M")}
			    >
			    	M
			    </Button>
			    <Button className={classes.button} 
			    	onClick={() => state.setSize("L")}
			    >
			    	L
			    </Button>
			    <Button className={classes.button} 
			    	onClick={() => state.setSize("XL")}
			    >
			    	XL
			    </Button>
		    </div>
		</React.Fragment>
	);
};

export default Size;