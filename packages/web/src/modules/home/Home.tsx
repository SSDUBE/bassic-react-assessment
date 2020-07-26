import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {useQuery, gql} from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import BounceLoader from 'react-spinners/BounceLoader';
import {makeStyles} from '@material-ui/core/styles';
import ListVehiclesCard from '../vehiclesCard/VehiclesCard';
import {theme} from '../../Theme';
import VehicleFilter from '../vehicleFilter/VehicleFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    // display: 'flex',
    height: '100vh',
    overflow: 'auto',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  vehicleContainer: {
    margin: theme.spacing(2),
  },
  content: {
    display: 'flex',
  },
  vehicleWrapper: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
}));

const Home = () => {
  const classes = useStyles();
  const {loading, error, data} = useQuery(AllVehicles);
  const [vehicleDataArray, setVehicleDataArray] = React.useState(data);

  function renderVihecleList(vehicleData: any) {
    console.log('vehicleData ', vehicleDataArray);
    return vehicleData.map((vehicle: any) => {
      return (
        <Box className={classes.vehicleContainer} key={vehicle.id}>
          <ListVehiclesCard vehicle={vehicle} />
        </Box>
      );
    });
  }

  // React.useState(() => {
  //   console.log("user ", data)
  // })

  console.log("vehicleDataArray ", vehicleDataArray)
  return error ? (
    <Typography variant="h1" className={classes.error}>
      {error}
    </Typography>
  ) : (
    <Box className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <BounceLoader
          size={150}
          color={theme.palette.secondary.main}
          loading={loading}
        />
      </Backdrop>

      {!loading && (
        <Box className={classes.content}>
          <VehicleFilter vehicles={data} setVehicleData={setVehicleDataArray} />
          <Box className={classes.vehicleWrapper}>
            {renderVihecleList(vehicleDataArray ? vehicleDataArray : data.allVehicles)}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const AllVehicles = gql`
  query GETAllVehicles {
    allVehicles {
      id
      manufacturer
      model
      body
      price
      img
    }
  }
`;

export default Home;
