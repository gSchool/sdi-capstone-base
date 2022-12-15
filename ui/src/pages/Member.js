import { Context } from '../App';
import { useContext } from "react"

const Member = () => {
    const { user } = useContext(Context);


    return(
        <p>welcome {user.first_name}</p>
    )


}

export default Member;