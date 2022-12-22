import './FAQ.css';
import React from 'react'
import Header from './Header';

function FAQ() {

    return (
        <>
            <Header />
            <div className="FAQ">
                <h1>Frequently Asked Questions</h1>
                <ul>
                    <li>Where do i see my requests after submission?</li>
                    <p>
                        You can see them on the Your Requests tab in the hamburger menu
                    </p>
                    <li>How do i make a request?</li>
                    <p>
                        This application functions similarly to a retail store. Simply find what you would
                        like to request, add it to you cart. and proceed to your cart to complete your request.
                    </p>
                    <li>What do i do if i have an issue logging in?</li>
                    <p>
                        If you have forgotten your password or need to delete your account for whatever reason.
                        Reach out to an admin from the admin link within the footer and request account support.
                    </p>
                    <li>How do SME's and commanders get assigned?</li>
                    <p>
                        Units will be assigned an account manager who will have there own Administrator account.
                        From this Administrator account they can assign roles, or remove people from there units respective database.</p>
                    <li>What is the meaning of life?</li>
                    <p>
                        The meaning of life, or the answer to the question: "What is the meaning of life?", pertains to
                        the significance of living or existence in general. Many other related questions include: "Why are we here?",
                        "What is life all about?", or "What is the purpose of existence?" There have been many proposed answers
                        to these questions from many different cultural and ideological backgrounds. The search for life's meaning
                        has produced much philosophical, scientific, theological, and metaphysical speculation throughout history.
                        Different people and cultures believe different things for the answer to this question. Also the answer is 47.
                    </p>
                </ul>
            </div>
            <div className="cartFormLine"></div>
        </>
    )
}

export default FAQ;