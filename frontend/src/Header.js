import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar class="header" position="static">
        <Toolbar>
          <Typography
            className="title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            SKKU USE
          </Typography>
          <Button color="inherit">{this.props.name}</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;
