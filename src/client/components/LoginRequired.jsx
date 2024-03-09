import { useNavigate } from "react-router-dom";

// if the user is logged in then render page, if not redirect them back to landing page
export function LoginRequired(props) {
    const imaginaryUser = localStorage.getItem("USER");
    
    console.log(imaginaryUser)

    let redirect = useNavigate()

    if (!imaginaryUser || imaginaryUser == "NaN") {
        // this makes the redirect pretty much instantaneous
        // redirect("/")
        window.location.href = "/";
    }
    
    return props.children
}
