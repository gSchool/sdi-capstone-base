import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from "react-bootstrap/Alert";
import { MdArrowCircleDown, MdArrowCircleUp, MdDeleteOutline } from "react-icons/md";
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import './ShoppingCart.css';

export default function ShoppingCart() {
    const [show, setShow] = useState([]); //toggle open and closing each item in cart
    const [showDelete, setShowDelete] = useState([]); //toggle delete notification
    const [yourCart, setYourCart] = useState([]);  //fetch and filter for logged in users cart
    const [modalShow, setModalShow] = useState(false); //toggles the modal indicating successful submission
    const [userCookies] = useCookies(["user"]); //users cookie
    let time = new Date().toISOString(); //current utc time

    //fetch for cart, then filter for users cart items
    useEffect(() => {
        fetch('http://localhost:8080/cart')
            .then((response) => response.json())
            .then((data) => {
                let cartFetch = []
                let showIndex = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user_id === userCookies.userToken[0]) {
                        cartFetch.push(data[i])
                        showIndex.push(data[i].id)
                    }
                }
                setShow(showIndex)
                setYourCart(cartFetch)
            })
    }, [])

    console.log("test", yourCart)

    //function to toggle individual cart items
    function toggleHandler(id) {
        if (show.includes(id)) {
            setShow(show.filter(function (newShow) {
                return newShow !== id
            }))
        } else {
            setShow(show => [...show, id])
        }
    }

    //function to toggle visibilty of delete pop up
    function toggleDeleteHandler(id) {
        if (showDelete.includes(id)) {
            setShowDelete(showDelete.filter(function (newShow) {
                return newShow !== id
            }))
        } else {
            setShowDelete(showDelete => [...showDelete, id])
        }
    }

    //function to delete cart item
    function deleteHandler(item) {
        console.log(item.asset_id)
        fetch(`http://localhost:8080/cart/${item.asset_id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(item)
        })
            .then(res => console.log("deleter", res));
    }

    //function to post request
    function submitRequest(event, item) {
        event.preventDefault()
        event.stopPropagation()
        deleteHandler(item)
        console.log(item)
        let date = event.target[0].value
        let missionTitle = event.target[1].value
        let location = event.target[2].value
        let justification = event.target[3].value
        let status = "Pending"
        let asset_id = item.id
        let sme_id = item.sme_id
        let user_id = item.user_id

        let data = {
            "date": date,
            "location": location,
            "mission_title": missionTitle,
            "justification": justification,
            "sme_status": status,
            "cmd_status": status,
            "user_id": user_id,
            "asset_id": asset_id,
            "sme_id": sme_id,
            "cmd_id": "1"
        }

        fetch('http://localhost:8080/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log("success", res));
    }

    return (
        <div className='cartPage'>
            <Header />
            {/* request page banner */}
            <div className='requests'>
                <h2>Requests</h2>
            </div>
            <div className='cartInfo'>
                <h4>Total Requests: {yourCart.length}</h4>
                <h4>UTC: {time}</h4>
                <h4>Username: {userCookies.userToken[1]}</h4>
            </div>
            <div className="cartFormLine"></div>
            {/* handler for when nothing is in the cart */}
            {yourCart.length === 0 ? <div className="noCart"><h2>You have not added any requests to your cart</h2></div> :
                <>
                {/* begining on map statement */}
                    {yourCart.map((item, idx) => (
                        <div className="Cart" key={idx}>
                            <>
                            {/* delete pop up notifiction */}
                                {showDelete.includes(item.id) ?
                                    <Alert
                                        className="text-center"
                                        variant="dark"
                                        onClose={() => setShowAlert(false)}
                                    >
                                        <Alert.Heading>
                                            Are you sure you would like to remove {item.type}/ {item.asset_name} from your cart?
                                        </Alert.Heading>
                                        <div className="deleteAlert">
                                            <Button
                                                onClick={() => {
                                                    deleteHandler(item);
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 100);
                                                }}
                                                variant="outline-success"
                                            >
                                                Yes
                                            </Button>
                                            <Button
                                                onClick={() => { toggleDeleteHandler(item.id) }}
                                                variant="outline-danger"
                                            >
                                                No
                                            </Button>
                                        </div>
                                    </Alert>
                                    : ""}
                            </>
                            <div className="cartForm">
                                <div>
                                    {/* cart item head */}
                                    <div className="requestTitle">
                                        <h2>{item.type}/ {item.asset_name}  |
                                            <button className="cartIcon" type="submit" onClick={() => { toggleDeleteHandler(item.id) }}>
                                                <MdDeleteOutline style={{ width: '30px', height: '30px' }} />
                                            </button>
                                            |
                                            {show.includes(item.id) ?
                                                <button className="cartIcon" type="submit" onClick={() => { toggleHandler(item.id) }}>
                                                    <MdArrowCircleUp style={{ width: '30px', height: '30px' }} />
                                                </button>
                                                :
                                                <button className="cartIcon" type="submit" onClick={() => { toggleHandler(item.id) }}>
                                                    <MdArrowCircleDown style={{ width: '30px', height: '30px' }} />
                                                </button>
                                            }
                                        </h2>
                                    </div>
                                    {/* cart submit form */}
                                    {show.includes(item.id) ?
                                        <Form className="cartSubmit" onSubmit={() => submitRequest(event, item)}>
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
                                            <Button variant="primary" type="submit" onClick={() => setModalShow(true)}>
                                                Submit
                                            </Button>
                                        </Form>
                                        : ""}
                                </div>
                                {/* cart image */}
                                <div className="cartImg">
                                    {show.includes(item.id) ?
                                        <img src={item.image_url} alt="alt" />
                                        : ""}
                                </div>
                                {/* modal that pops up when cart success */}
                                <RequestSuccessModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                            <div className="cartFormLine"></div>
                        </div >
                    ))
                    }
                </>
            }
        </div>
    )
}

//request submitted modal
function RequestSuccessModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-center">
                    Request Submitted
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Your submission was succesful and is currently pending concurrence
                    with the associated SME. If you would like to view the status of this
                    submission please navigate to "Your Requests" from the hamburger menu.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { window.location.reload(), props.onHide }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}






