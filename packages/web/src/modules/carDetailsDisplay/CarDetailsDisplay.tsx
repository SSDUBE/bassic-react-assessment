import React from 'react';
import {Box, Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import ListVehiclesCard from './components/VehiclesCard';
import {
  VehiclesProps,
  AmountDataProps,
  manufacturerSelectProps,
  bodyStyleSelectProps,
} from '../../utils/Utils';
import Cart from '../cart/Cart';

const useStyles = makeStyles((theme) => ({
  vehicleContainer: {
    margin: theme.spacing(2),
  },
  notFound: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(18),
  },
  cart: {
    position: 'absolute',
    top: 0,
    marginLeft: '100%',
  },
}));

interface Props {
  vehicles: VehiclesProps[];
  manufactureSelect: VehiclesProps | manufacturerSelectProps;
  bodyStyleSelect: VehiclesProps | bodyStyleSelectProps;
  fromSelect: AmountDataProps;
  toSelect: AmountDataProps;
}

const CarsDetailsDisplay = ({
  vehicles,
  manufactureSelect,
  bodyStyleSelect,
  fromSelect,
  toSelect,
}: Props) => {
  const classes = useStyles();
  const [vehicleDataArray, setVehicleDataArray] = React.useState(vehicles);
  const [addToCart, setAddToCart] = React.useState([]);

  const filterByAmount = React.useCallback(
    function (data: VehiclesProps[]) {
      if (fromSelect.amount < toSelect.amount) {
        return data.filter(
          (vehicle) =>
            vehicle.price >= fromSelect.amount &&
            vehicle.price <= toSelect.amount
        );
      }
      alert('Minimum price must be lower than maximum price.');
      return data;
    },
    [fromSelect, toSelect]
  );

  React.useEffect(() => {
    if (manufactureSelect.manufacturer !== 'Any') {
      const vehicleFilter = vehicles.filter(
        (vehicle) => vehicle.manufacturer === manufactureSelect.manufacturer
      );
      setVehicleDataArray(filterByAmount(vehicleFilter));
    } else if (
      manufactureSelect.manufacturer !== 'Any' &&
      bodyStyleSelect.body !== 'Any'
    ) {
      const vehicleFilter = vehicles.filter(
        (vehicle) => vehicle.manufacturer === manufactureSelect.manufacturer
      );
      const bodyVehicleFilter = vehicleFilter.filter(
        (vehicle) => vehicle.body === bodyStyleSelect.body
      );
      setVehicleDataArray(filterByAmount(bodyVehicleFilter));
    } else if (
      manufactureSelect.manufacturer === 'Any' &&
      bodyStyleSelect.body !== 'Any'
    ) {
      const bodyVehicleFilter = vehicles.filter(
        (vehicle) => vehicle.body === bodyStyleSelect.body
      );
      setVehicleDataArray(filterByAmount(bodyVehicleFilter));
    } else {
      console.log(manufactureSelect.manufacturer, bodyStyleSelect.body);
      setVehicleDataArray(filterByAmount(vehicles));
    }
  }, [manufactureSelect, bodyStyleSelect, vehicles, filterByAmount]);

  if (vehicleDataArray.length === 0) {
    return (
      <Typography variant="h2" className={classes.notFound}>
        No Vehicles Found
      </Typography>
    );
  }

  return (
    <Box style={{position: 'relative'}}>
      {vehicleDataArray.map((vehicle: any) => {
        return (
          <Box className={classes.vehicleContainer} key={vehicle.id}>
            <ListVehiclesCard vehicle={vehicle} setAddToCart={setAddToCart} />
          </Box>
        );
      })}
      <Box className={classes.cart}>
        <Cart vehicles={addToCart} setAddToCart={setAddToCart} />
      </Box>
    </Box>
  );
};

export default CarsDetailsDisplay;
