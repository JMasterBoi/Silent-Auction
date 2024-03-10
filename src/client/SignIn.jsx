import { useEffect, useState } from "react";
import { toastMessage } from "./main"
import axios from 'axios';

export function SignIn() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [visibility, setVisibility] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem("USER") != "NaN")
            window.location.href = "/auction";
        else console.log("user not logged in")
    }, [])

    function loginSubmit(e) {
        e.preventDefault()
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !username || !password || !repeatPassword) {
            toastMessage.fire({
                "icon": "error",
                "title": "One or more fields are empty"
            })
            return
        } else if (!re.test(String(email).toLowerCase())) {
            toastMessage.fire({
                "icon": "error",
                "title": "Please enter a valid email address"
            })
            return
        } else if (password != repeatPassword) {
            toastMessage.fire({
                "icon": "error",
                "title": "Your passwords don't match"
            })
            return
        }

         axios.post("http://18.189.192.80:3000/api/sign-in", {
            email: email,
            name: username,
            password: password
        }).then((res) => {
            localStorage.setItem("USER", res.data)
            window.location.href = "/auction?login-success=true";
        })
    }

    return <>
        <h2>Please Create an Account</h2>
        <form onSubmit={loginSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" value={email} onChange={e => {setEmail(e.target.value)}} />

            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={username} onChange={e => {setUsername(e.target.value)}} />

            <br />

            <label htmlFor="password">Password</label>
            <input type={visibility ? "text" : "password"} name="password" id="password" value={password} onChange={e => {setPassword(e.target.value)}} />

            <br />
            <div className="flex-row">
                <label htmlFor="visibility" >Show Password</label>
                <input type="checkbox" name="visibility" id="visibility" value={visibility} onChange={(e) => {setVisibility((prev) => { return !prev })}} />
            </div>
            <br />

            {/* <img onClick={() => {setVisibility((prev) => {return !prev})}} style={{float: "right"}} src={`./src/client/static/MaterialSymbolsVisibility${ visibility ? "Off" : "" }Outline.svg`} alt="set-visibility" /> */}
            <label htmlFor="repeat-password">Repeat Password</label>
            <input type={visibility ? "text" : "password"} name="repeat-password" id="repeat-password" value={repeatPassword} onChange={e => {setRepeatPassword(e.target.value)}} />

            <br />

            <button type="submit" className="primary-btn btn-animation">Submit</button>
        </form>
    </>
}
