import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  topElement: {
  	bottom: 10,
  }
}));

const TopBar = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={1} direction="row">
			<Grid item xs={2} className={classes.topElement}>
				<Typography>
					Size:
				</Typography>
			</Grid>
			<Grid item xs={5} className={classes.topElement}>
				<Typography>
					Product(s) found.
				</Typography>
			</Grid>
			<Grid item xs={5} className={classes.topElement}>
				<Typography>
					Order by:
				</Typography>
		      	<FormControl className={classes.formControl}>
		        <InputLabel htmlFor="order-select">Select</InputLabel>
			        <Select
			        >
				        <option value={10}>Lowest to Highest</option>
				        <option value={20}>Highest to Lowest</option>
		        	</Select>
		      	</FormControl>
			</Grid>
		</Grid>
	);
};

export default TopBar;