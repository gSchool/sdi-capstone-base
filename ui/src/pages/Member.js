import { Context } from '../App';
import { useState, useEffect, useContext } from "react"

const Member = () => {
    const { authenticatedUser, setAuthenticatedUser } = useContext(Context);


    return(
        <p>welcome {authenticatedUser.first_name}</p>
    )


}

export default Member;