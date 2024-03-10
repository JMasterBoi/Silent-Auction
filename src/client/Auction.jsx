import { useEffect, useState } from 'react'
import axios from 'axios';
import { AuctionItem } from "./components/AuctionItem";
import { mySwal, toastMessage } from "./main"

export function Auction() {
    const [items, setItems] = useState([])
    console.log(items)
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("login-success")){
            toastMessage.fire({
                icon: "success",
                title: "Account created successfully!"
            })
        }

        axios.post("http://18.189.192.80:3000/api/get-items").then((res) => {
            setItems(res.data)
        })
    }, [])


    return <>
        <h2>2024 Golf Tournament Silent Auction</h2>

        {items.map((item) => {
            return <AuctionItem {...item} key={item._id} />
        })}
    </>
}
