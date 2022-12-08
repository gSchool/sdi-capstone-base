import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
// import axios from "axios";

export default function AssetView() {
  const handleRemove = () => {};

  const handleRequest = () => {};

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://c.files.bbci.co.uk/AD05/production/_123139244_reaper_getty.jpg"
        ></Card.Img>
        <Card.Body>
          <Card.Title>This is a title</Card.Title>
          <Card.Text>This is a placeholder</Card.Text>
          <ButtonGroup>
            <Button variant="outline-danger" onClick={() => handleRemove()}>
              Remove
            </Button>
            <Button variant="outline-success" onClick={() => handleRequest()}>
              Request
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </>
  );
}
