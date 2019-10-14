import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default ({ data = [], onSelected }) => {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);

  const handleChange = ({ target: { value } }) => {
    setItems(value);
    onSelected(value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setItems(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor='select-multiple-checkbox'>Projects</InputLabel>
      <Select
        multiple
        value={items}
        onChange={handleChange}
        input={<Input id='select-multiple-checkbox' />}
        renderValue={selected => selected.map(({ name }) => name).join(', ')}
        MenuProps={MenuProps}
      >
        {data.map(item => (
          <MenuItem key={item.id} value={item}>
            <Checkbox checked={items.indexOf(item) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
