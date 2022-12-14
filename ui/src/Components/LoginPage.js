import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import logo from "../img/logo.png";
import { useCookies } from "react-cookie";

function LoginPage() {
  const [user, setUser] = useState(); //user table fetch
  const [sme, setSME] = useState(); //sme table fetch
  const [cmd, setCMD] = useState(); //cmd table fetch
  const [show, setShow] = useState(false); //toggles create account form
  const [showAlert, setShowAlert] = useState(false); //toggles the login failure pop up
  const [showSuccess, setShowSuccess] = useState(false); //toggles the account created pop up
  const [validated, setValidated] = useState(false); //toggles input validation alerts(just the styling)
  const [errors, setErrors] = useState([]); //holds error strings
  const [form, setForm] = useState([]); //contains create account form entries in seperate objects
  const [disableButton, setDisableButton] = useState(false); //disables create account to prevent multiple PUT's
  const [userCookie, setUserCookie] = useCookies(["user"]); //user cookie
  const [smeCookie, setSmeCookie] = useCookies(["sme"]); //sme cookie
  const [cmdCookie, setCmdCookie] = useCookies(["cmd"]); //cmd cookie
  const navigate = useNavigate(); //user -> Home      sme & cmd -> Approver
  const bcrypt = require("bcryptjs"); //gives access to the bcrypt algorithm

  //fetch to the user, sme, and cmd tables
  useEffect(() => {
    fetch("http://localhost:8080/login")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
    fetch("http://localhost:8080/sme")
      .then((response) => response.json())
      .then((data) => {
        setSME(data);
      });
    fetch("http://localhost:8080/cmd")
      .then((response) => response.json())
      .then((data) => {
        setCMD(data);
      });
  }, []);

  //sets a state with the create account form inputs
  function setField(field, value) {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  }

  //check the form state for errors
  function findFormErrors() {
    let {
      firstName,
      lastName,
      eMail,
      unit,
      position,
      phoneNumber,
      username,
      password,
    } = form;
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    let validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; //allows these US formats 123-456-7890 / (123) 456-7890 / 123 456 7890 / 123.456.7890 / +91 (123) 456-7890
    let newErrors = {};
    let usernamesDB = [];
    let emailsDB = [];
    let allUsers = user.concat(sme, cmd);
    for (let i = 0; i < allUsers.length; i++) {
      usernamesDB.push(allUsers[i].username);
      emailsDB.push(allUsers[i].email);
    }
    if (!firstName || firstName === "")
      newErrors.firstName = "This is a required field.";
    if (!lastName || lastName === "")
      newErrors.lastName = "This is a required field.";
    if (!eMail || eMail === "") newErrors.eMail = "This is a required field.";
    else if (!eMail.includes("@"))
      newErrors.eMail = "Please provide a valid E-mail address.";
    else if (emailsDB.includes(eMail))
      newErrors.eMail = "That email address is already registered with us.";
    if (!unit || unit === "") newErrors.unit = "This is a required field.";
    if (!position || position === "")
      newErrors.position = "This is a required field.";
    if (!phoneNumber || phoneNumber === "")
      newErrors.phoneNumber = "This is a required field.";
    else if (!phoneNumber.match(validPhone))
      newErrors.phoneNumber =
        "Please provide a valid phone number, utilizing the proper format.";
    if (!username || username === "")
      newErrors.username = "This is a required field.";
    else if (usernamesDB.includes(username))
      newErrors.username =
        "That username already exists in our database, please choose another username.";
    if (!password || password === "")
      newErrors.password = "This is a required field.";
    else if (!password.match(strongPassword))
      newErrors.password =
        "Must be at least 8 characters, contain at least one uppercase, one lowercase, one digit, and one special character.";
    return newErrors;
  }

  //function called when attempting to login
  function loginFunction(e) {

    e.preventDefault();
    let subUser = e.target.form[0].value;
    let subPass = e.target.form[1].value;
    let isUser = false;
    let isSME = false;
    let isCMD = false;
    let thisSme = [];
    let thisUser = [];
    let thisCmd = [];

    for (let i = 0; i < user.length; i++) {
      if (
        user[i].username === subUser &&
        bcrypt.compareSync(subPass, user[i].password)
      ) {
        thisUser.push(user[i].id, user[i].username);
        isUser = true;

      }
    }
    for (let i = 0; i < sme.length; i++) {
      if (sme[i].username === subUser && sme[i].password === subPass) {

        thisSme.push(sme[i].id, sme[i].username);
        isSME = true;

      }
    }
    for (let i = 0; i < cmd.length; i++) {
      if (cmd[i].username === subUser && cmd[i].password === subPass) {

        thisCmd.push(cmd[i].id, cmd[i].username);
        isCMD = true;
      }
    }

    if (isUser) {
      setUserCookie("userToken", thisUser, { path: "/" });
      console.log(userCookie);
      navigate("/Home");
    } else if (isSME) {
      setSmeCookie("sme", thisSme, { path: "/" });
      console.log(smeCookie);
      navigate("/SME");
    } else if (isCMD) {
      setCmdCookie("cmd", thisCmd, { path: "/" });
      console.log(cmdCookie);
      navigate("/Approver");
    } else setShowAlert(true);
  }
  console.log(user);
  //function called when submitting a new account
  function submitUser(e) {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setValidated(true);
      e.preventDefault();
      e.currentTarget.disabled = true;
      let firstName = e.target[0].value;
      let lastName = e.target[1].value;
      let eMail = e.target[2].value;
      let unit = e.target[3].value;
      let position = e.target[4].value;
      let phoneNumber = e.target[5].value;
      let username = e.target[6].value;
      let password = e.target[7].value;
      let type = e.target[8].value;
      let hash = "";
      if (type === "User") {
        hash = bcrypt.hashSync(password, 8);
      } else {
        hash = password;

      }

      let data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        unit: unit,
        position: position,
        password: hash,
        phone_number: phoneNumber,
        email: eMail,
        type: type,
      };

      if (type === "User") {
        fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(data),
        }).then((res) => console.log(res));
      } else if (type === "SME") {
        fetch("http://localhost:8080/sme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(data),
        }).then((res) => console.log(res));
      } else if (type === "Commander") {
        fetch("http://localhost:8080/cmd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(data),
        }).then((res) => console.log(res));
      }
      setShowSuccess(true);
      setDisableButton(true);
    }
  }

  return (
    <div className="loginPage">
      {/* header */}
      <div className="loginheader">
        <img src={logo} alt="alt" />
      </div>
      {/* video loop */}
      <div className="loginoverall">
        <video autoPlay loop muted id="video">
          <source
            src="https://download-video.akamaized.net/2/playback/f51547ca-5c63-4b2d-a972-210c3068f2ed/941c0fd4-fbce8f1a?__token__=st=1671031168~exp=1671045568~acl=%2F2%2Fplayback%2Ff51547ca-5c63-4b2d-a972-210c3068f2ed%2F941c0fd4-fbce8f1a%2A~hmac=2819d15e7213a5412fb0ed01a07921d0d94f512d18989048046784a9435b2535&r=dXMtZWFzdDE%3D"
            type="video/mp4"
          />
        </video>
      </div>
      <br></br>
      {/* login section */}
      {!show && (
        <Form className="login">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridInitialUser">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="JohnDoe123" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridInitialPass">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="123456789" />
            </Form.Group>
          </Row>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => loginFunction(e)}
          >
            Login
          </Button>
        </Form>
      )}
      {/* pop up alert when login fails */}
      {showAlert && (
        <>
          <br></br>
          <Alert
            className="text-center"
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>
              We could not find an account matching that username and password.
            </Alert.Heading>
            <p>
              Please try again, or create an account by pressing the button
              below.
            </p>
          </Alert>
        </>
      )}
      <br></br>
      {/* create an account button */}
      {!show && !showAlert && (
        <div className="stupidOR">
          <p>or</p>
        </div>
      )}
      <Button
        onClick={() => {
          setShowAlert(false);
          setShow(!show);
          setShowSuccess(false);
        }}
      >
        {!show ? "Create an Account" : "Back to Login"}
      </Button>
      <br></br>
      <br></br>
      {/* form for creating an account */}
      {show && (
        <div>
          <Form
            noValidate
            validated={validated}
            className="login"
            onSubmit={submitUser}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  isInvalid={!!errors.firstName}
                  type="text"
                  placeholder="John"
                  onChange={(e) => setField("firstName", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  isInvalid={!!errors.lastName}
                  type="text"
                  placeholder="Doe"
                  onChange={(e) => setField("lastName", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  isInvalid={!!errors.eMail}
                  type="email"
                  placeholder="JohnDoe@army.mil"
                  onChange={(e) => setField("eMail", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.eMail}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUnit">
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  isInvalid={!!errors.unit}
                  type="text"
                  placeholder="82nd ESB"
                  onChange={(e) => setField("unit", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.unit}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  isInvalid={!!errors.position}
                  type="text"
                  placeholder="Team Sergeant"
                  onChange={(e) => setField("position", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.position}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  isInvalid={!!errors.phoneNumber}
                  type="text"
                  placeholder="123-456-7890"
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  isInvalid={!!errors.username}
                  type="text"
                  placeholder="JohnD123"
                  onChange={(e) => setField("username", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  isInvalid={!!errors.password}
                  type="password"
                  placeholder="Abc123!!"
                  onChange={(e) => setField("password", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridtype">
                <Form.Label>Type of account</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>User</option>
                  <option>SME</option>
                  <option>Commander</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button disabled={disableButton} variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
          <br></br>
          {/* Pop up alert when successful account created */}
          {showSuccess && (
            <Alert variant="success">
              <Alert.Heading>Account creation successful!</Alert.Heading>
              <p>
                Click the button below to login with your new username and
                password.
              </p>
              <hr />
              <div>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline-success"
                >
                  Proceed
                </Button>
              </div>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}

//EOD
export default LoginPage;