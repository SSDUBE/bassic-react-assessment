import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  carFilter: {
    margin: theme.spacing(2),
  },
  priceRange: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  combobox: {
    width: '300px',
    marginTop: theme.spacing(2),
  },
}));

const amountData = [
  {amount: 0, id: '0'},
  {amount: 50000, id: '50 000'},
  {amount: 100000, id: '100 000'},
  {amount: 200000, id: '200 000'},
  {amount: 300000, id: '300 000'},
  {amount: 400000, id: '400 000'},
  {amount: 500000, id: '500 000'},
  {amount: 600000, id: '600 000'},
  {amount: 700000, id: '700 000'},
  {amount: 800000, id: '800 000'},
  {amount: 900000, id: '900 000'},
  {amount: 1000000, id: '1 000 000'},
  {amount: 2000000, id: '2 000 000'},
  {amount: 3000000, id: '3 000 000'},
  {amount: 4000000, id: '4 000 000'},
  {amount: 5000000, id: '5 000 000'},
  {amount: 6000000, id: '6 000 000'},
  {amount: 7000000, id: '7 000 000'},
  {amount: 8000000, id: '8 000 000'},
  {amount: 9000000, id: '9 000 000'},
  {amount: 10000000, id: '10 000 000'},
];

interface Props {
  vehicles: any;
  setVehicleData: React.Dispatch<any>;
}

interface ComboBoxProps {
  label: string;
  data: any;
  handleChange: Function;
  value: any;
  getOptionLabel: (option: any) => any;
}

const VehicleFilter = ({vehicles, setVehicleData}: Props) => {
  const classes = useStyles();

  const [manufactureData, setManufacture] = React.useState({
    manufacturer: 'Any',
  });
  const [bodyStyle, setBodyStyle] = React.useState({body: 'Any'});
  const [from, setFrom] = React.useState({amount: 0, id: '0'});
  const [to, setTo] = React.useState({amount: 10000000, id: '10 000 000'});

  // function filterVehicleBodyStyle(value: any) {

  // }

  const filterVehicleManufacture = React.useCallback((val) => {
    // function filterVehicleManufacture() {
      const data1 = vehicles.allVehicles.filter(
        (vehicle: any) => vehicle.manufacturer === manufactureData.manufacturer
      )

      // setVehicleData(data1)
      console.log("data ", data1)
      // let filter = undefined
        // filter = vehicles.allVehicles.filter(
        //   (vehicle: any) => vehicle.manufacturer === value.manufacturer
        // )
        // setVehicleData(filter);
      // if (filter) {
      //   setVehicleData(filter);
      // } else {
      //   setVehicleData(vehicles.allVehicles)
      // }
    // }
  }, [vehicles, manufactureData])

  // React.useEffect(() => {
  //   // console.log("state ", manufactureData)

  // })

  function Combobox({
    label,
    data,
    handleChange,
    value,
    getOptionLabel,
  }: ComboBoxProps) {
    return (
      <Autocomplete
        closeIcon={false}
        options={data}
        getOptionLabel={getOptionLabel}
        className={classes.combobox}
        onChange={(_, value) => {
          handleChange(value)
          filterVehicleManufacture(value);
        }}
        value={value}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    );
  }

  return (
    <Box className={classes.carFilter}>
      <Combobox
        label="Manufacture"
        data={[{manufacturer: 'Any'}, ...vehicles.allVehicles]}
        value={manufactureData}
        handleChange={setManufacture}
        getOptionLabel={(option: any) => option.manufacturer}
      />
      <Combobox
        label="Body Style"
        data={[{body: 'Any'}, ...vehicles.allVehicles]}
        value={bodyStyle}
        handleChange={setBodyStyle}
        getOptionLabel={(option: any) => option.body}
      />
      <Typography variant="h1" className={classes.priceRange}>
        Price Range
      </Typography>
      <Combobox
        label="From"
        data={amountData}
        value={from}
        handleChange={setFrom}
        getOptionLabel={(option: any) => option.id}
      />
      <Combobox
        label="To"
        data={amountData.slice(1)}
        value={to}
        handleChange={setTo}
        getOptionLabel={(option: any) => option.id}
      />
    </Box>
  );
};

export default VehicleFilter;
