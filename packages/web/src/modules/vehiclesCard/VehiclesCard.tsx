import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '500px',
    height: '140px',
    border: `2px solid ${theme.palette.primary.main}`,
    background: theme.palette.primary.light,
    borderRadius: '10px',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    width: '490px',
  },
  cover: {
    width: '125px',
    height: '130px',
    marginLeft: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(1.5),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'inherit',
    marginRight: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
  },
  error: {
    color: 'red',
  },
}));

interface Props {
  vehicle: any;
}

const VehiclesCard = ({vehicle}: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img
        className={classes.cover}
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        alt={vehicle.manufacturer}
      />
      <Box className={classes.details}>
        <Typography
          variant="h1"
          className={classes.description}
        >{`Price: R${vehicle.price}`}</Typography>
        <Typography
          variant="h1"
          className={classes.description}
        >{`Make: ${vehicle.manufacturer}`}</Typography>
        <Typography
          variant="h1"
          className={classes.description}
        >{`Model: ${vehicle.model}`}</Typography>
        <Typography
          variant="h1"
          className={classes.description}
        >{`Body: ${vehicle.body}`}</Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default VehiclesCard;
