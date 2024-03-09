// basic react imports
import { StrictMode, useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
// style imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./static/styles.css"
// routing imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginRequired } from './components/LoginRequired.jsx'
import { Auction } from "./Auction.jsx"
import { SignIn } from "./SignIn.jsx"
import { CreateItem } from "./CreateItem.jsx"

// react compatible version of sweet alert available to all files
export const mySwal = withReactContent(Swal).mixin({
    background: "#262626",
    color: "#ECECEC",
    confirmButtonColor: "#05824a",
    customClass: {
        timerProgressBar: "swalProgressBar",
        htmlContainer: "swal-html-container",
        confirmButton: "primary-btn btn-animation"
    }
})
export let toastMessage = withReactContent(mySwal).mixin({
    toast: true,
    showConfirmButton: false,
    position: "top-start",
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', mySwal.stopTimer)
        toast.addEventListener('mouseleave', mySwal.resumeTimer)
    },
    width: "fit-content"
})

function Main() {
    // same thing for user token
    //* FORMAT: {id, accessToken}
    const [user, setUser] = useState(() => {
        // get user
        const localValue = localStorage.getItem("USER");
        if (localValue === "null") return null;
        // return user as an int
        else return parseInt(localValue); 
    });
    useEffect(() => {
        localStorage.setItem("USER", user)
    }, [user]);

    // checks if user is logged and if they are then return the user (maybe readonly, could be devasting consequences for attempting to modify)
    function userLogged() {
        if (user === 0) return true

        return Boolean(user);
    }

    return <>
        
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/auction" element={
                    <LoginRequired>
                        <Auction />
                    </LoginRequired>
                }></Route>

                <Route path="/create-item" element={<CreateItem />} ></Route>
            </Routes>
        </Router>
        <br /><br /><br />
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Main />
    </StrictMode>
)
