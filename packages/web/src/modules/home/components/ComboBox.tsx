import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {VehiclesProps, AmountDataProps} from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({
  priceRange: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  combobox: {
    width: '300px',
    marginTop: theme.spacing(2),
  },
}));

interface ComboBoxProps {
  label: string;
  vehicles: VehiclesProps[] | AmountDataProps[];
  handleChange: Function;
  value: any;
  getOptionLabel: (option: any) => any;
}

const ComboBox = ({
  label,
  vehicles,
  handleChange,
  value,
  getOptionLabel,
}: ComboBoxProps) => {
  const classes = useStyles();

  return (
    <Autocomplete
      closeIcon={false}
      options={vehicles}
      getOptionLabel={getOptionLabel}
      className={classes.combobox}
      onChange={(_, value) => handleChange(value)}
      value={value}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default ComboBox;
