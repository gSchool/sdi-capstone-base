import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { MdOutlineShoppingCart } from "react-icons/md";

import logo from "../img/logo.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

function Header() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click here to complete your requests.
    </Tooltip>
  );

  return (
    <div className="Header">
      <div className="grid1">
        <SideMenu />
      </div>
      <div className="grid2">
        <Link to={`/Home`}>
          <img src={logo} alt="alt" />
        </Link>
      </div>
      <div className="grid3">
        <Link to={`/ShoppingCart`}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant="success">
              <MdOutlineShoppingCart
                style={{ color: "black", width: "38px", height: "38px" }}
              />
              1{" "}
              {/*this number will dynamically display the number of things in your shopping cart*/}
            </Button>
          </OverlayTrigger>
        </Link>
      </div>
    </div>
  );
}

export default Header;
