import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { links } from './const';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        style={{ top: 40 }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map((item) => (
          <MenuItem
            style={{ minWidth: 300 }}
            key={item.text}
            component={Link}
            to={`${item.to}`}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
