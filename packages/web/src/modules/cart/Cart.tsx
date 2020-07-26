import React from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {VehiclesProps} from '../../utils/Utils';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
    height: '140px',
    border: `2px solid ${theme.palette.primary.main}`,
    background: theme.palette.primary.light,
    borderRadius: '10px',
    marginTop: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    height: '30px',
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cart: {
    marginBottom: theme.spacing(2),
  },
  delete: {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface Props {
  vehicles: VehiclesProps[];
  setAddToCart: React.Dispatch<React.SetStateAction<any>>;
}

const Cart = ({vehicles, setAddToCart}: Props) => {
  const classes = useStyles();

  function removeFromCart(index: number) {
    const removed = vehicles.filter((_, i) => i !== index);
    console.log(index);
    console.log(removed);
    setAddToCart(removed);
  }

  if (vehicles.length <= 0) {
    return <></>;
  }

  return (
    <>
      {vehicles.map((vehicle, index) => (
        <Card className={classes.root} key={index}>
          <Box className={classes.details}>
            <Typography variant="h2" className={classes.cart}>
              Cart
            </Typography>
            <Box className={classes.delete}>
              <Typography variant="h1">{vehicle.manufacturer}</Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={() => removeFromCart(index)}
              >
                X
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default Cart;
