import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../img/logo.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";

function Header() {
  const [show, setShow] = useState([]);
  const [userCookies] = useCookies(["user"]);

  useEffect(() => {
    fetch("http://localhost:8080/cart")
      .then((response) => response.json())
      .then((data) => {
        let cartFetch = [];
        let showIndex = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].user_id === userCookies.userToken[0]) {
            cartFetch.push(data[i]);
            showIndex.push(data[i].id);
          }
        }
        const isDuplicate = Array.from(new Set(cartFetch.map((a) => a.id))).map(
          (id) => {
            return cartFetch.find((a) => a.id === id);
          }
        );
        setShow(isDuplicate);
      });
  }, []);

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
                style={{ color: "#904E55", width: "38px", height: "38px" }}
              />
              {show.length > 0 ? show.length : ""}
            </Button>
          </OverlayTrigger>
        </Link>
      </div>
    </div>
  );
}

export default Header;
