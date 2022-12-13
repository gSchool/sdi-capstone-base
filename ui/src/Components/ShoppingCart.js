import React, { useState } from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MdArrowDropDownCircle } from "react-icons/md";

export default function ShoppingCart() {
    const [show, setShow] = useState([])
    const cartItems = JSON.parse(localStorage.getItem('cartInfo'));

    function toggleHandler(id) {
        if (show.includes(id)) {
            setShow(show.filter(function (newShow) {
                return newShow !== id
            }))
        } else {
            setShow(show => [...show, id])
        }
    }

    function submitRequest(event, id) {
        event.preventDefault()
        event.stopPropagation()
        console.log("this form", event)
        console.log("passed in id", id)
        let input = {}
        for (let i = 0; i < cartItems.length; i++) {
            if (id === cartItems[i].asset.id) {
                input = cartItems[i]
            }
        }

        let date = event.target[0].value
        let missionTitle = event.target[1].value
        let location = event.target[2].value
        let justification = event.target[3].value
        let status = "pending"
        let asset_id = input.asset.id
        // let user_id = //pull from cookies(possible fetch)
        // let sme_id = //pull from db
        // let cmd_id = //pull from db
        let data = {
            "date": date,
            "location": location,
            "mission_title": missionTitle,
            "justification": justification,
            "status": status,
            "user_id": "1",
            "asset_id": asset_id,
            "sme_id": "1",
            "cmd_id": "1"
        }

        fetch('http://localhost:8080/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
    }

    return (
        <>
            <Header />
            {cartItems.length === 0 ? <div className="requestTitle"><h2>You have not yet added any requests to your cart.</h2></div> :
                <>
                    <div className="cartFormLine"></div>
                    {cartItems.map((item, idx) => (
                        <div className="Cart" key={idx}>
                            <div className="requestTitle">
                                <h2>{item.asset.type}/ {item.asset.asset_name}
                                    <button type="submit" onClick={() => { toggleHandler(item.asset.id) }}>
                                        <MdArrowDropDownCircle style={{ width: '30px', height: '30px', color: 'black' }} />
                                    </button>
                                </h2>
                            </div>
                            {show.includes(item.asset.id) ?
                                <div className="cartForm">
                                    <img src={item.asset.image_url} width="500" height="300" alt="alt" />
                                    <Form className="login" onSubmit={() => submitRequest(event, item.asset.id)}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formDate">
                                                <Form.Label>Dates</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formTitle">
                                                <Form.Label>Mission Title</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formLocation">
                                                <Form.Label>Mission Location</Form.Label>
                                                <Form.Control as="textarea" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formJustification">
                                                <Form.Label>Justification</Form.Label>
                                                <Form.Control as="textarea" />
                                            </Form.Group>
                                        </Row>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </div>
                            : ""}
                            <div className="cartFormLine"></div>
                        </div >
                    ))
                    }
                </>
            }
        </>
    )
}
