import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useQuery, gql} from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import BounceLoader from 'react-spinners/BounceLoader';
import CarDetailsDisplay from '../carDetailsDisplay/CarDetailsDisplay';
import {theme} from '../../Theme';
import {VehiclesProps, amountData} from '../../utils/Utils';
import ComboBox from './components/ComboBox';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: '100vh',
    overflow: 'auto',
  },
  carFilter: {
    margin: theme.spacing(2),
  },
  priceRange: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  error: {
    color: 'red',
  },
  vehiclesContiner: {
    display: 'flex',
  },
  button: {
    textTransform: 'none',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const {loading, error, data} = useQuery(AllVehicles);

  const [manufactureSelect, setManufactureSelect] = React.useState({
    manufacturer: 'Any',
  });
  const [bodyStyleSelect, setBodyStyleSelect] = React.useState({body: 'Any'});
  const [fromSelect, setFromSelect] = React.useState({amount: 0, id: '0'});
  const [toSelect, setToSelect] = React.useState({
    amount: 10000000,
    id: '10 000 000',
  });

  function getManufacturerType(): any {
    const options = _.uniqBy(data.allVehicles, 'manufacturer');
    return [{manufacturer: 'Any'}, ...options];
  }

  function getBodyType(): any {
    if (manufactureSelect.manufacturer !== 'Any') {
      const options = data.allVehicles.filter(
        (vehicle: VehiclesProps) =>
          vehicle.manufacturer === manufactureSelect.manufacturer
      );

      return [{body: 'Any'}, ...options];
    }
    return [{body: 'Any'}, ...data.allVehicles];
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant="h2">Browse Vehicles</Typography>
      </Box>
      <Box className={classes.carFilter}>
        {error ? (
          <Typography variant="h1" className={classes.error}>
            {error}
          </Typography>
        ) : (
          <Box>
            <Backdrop className={classes.backdrop} open={loading}>
              <BounceLoader
                size={150}
                color={theme.palette.secondary.main}
                loading={loading}
              />
            </Backdrop>
            {!loading && (
              <Box className={classes.vehiclesContiner}>
                <Box>
                  <ComboBox
                    label="Manufacture"
                    vehicles={getManufacturerType()}
                    value={manufactureSelect}
                    handleChange={setManufactureSelect}
                    getOptionLabel={(option: any) => option.manufacturer}
                  />
                  <ComboBox
                    label="Body Style"
                    vehicles={getBodyType()}
                    value={bodyStyleSelect}
                    handleChange={setBodyStyleSelect}
                    getOptionLabel={(option: VehiclesProps) => option.body}
                  />
                  <Typography variant="h1" className={classes.priceRange}>
                    Price Range
                  </Typography>
                  <ComboBox
                    label="From"
                    vehicles={amountData}
                    value={fromSelect}
                    handleChange={setFromSelect}
                    getOptionLabel={(option: VehiclesProps) => option.id}
                  />
                  <ComboBox
                    label="To"
                    vehicles={amountData.slice(1)}
                    value={toSelect}
                    handleChange={setToSelect}
                    getOptionLabel={(option: VehiclesProps) => option.id}
                  />
                </Box>
                <CarDetailsDisplay
                  vehicles={data.allVehicles}
                  manufactureSelect={manufactureSelect}
                  bodyStyleSelect={bodyStyleSelect}
                  fromSelect={fromSelect}
                  toSelect={toSelect}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
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
