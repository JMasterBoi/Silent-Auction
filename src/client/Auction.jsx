import { useEffect, useState } from 'react'
import axios from 'axios';
import { AuctionItem } from "./components/AuctionItem";
import { mySwal, toastMessage } from "./main"

export function Auction() {
    const [items, setItems] = useState([])

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("login-success")){
            toastMessage.fire({
                icon: "success",
                title: "Account created successfully!"
            })
        } else if (new URLSearchParams(window.location.search).get("bid-success")) {
            toastMessage.fire({
                icon: "success",
                title: "Bid sent successfully"
            })
        }

        axios.post("/api/get-items").then((res) => {
            setItems(res.data)
        })
    }, [])

    return <>
        <h2>2024 Golf Tournament Silent Auction</h2>
        <div className="flex-row"><i style={{textAlign: "center"}}><u>we'll collect payments once the bidding is done</u></i></div>
        

        {items.map((item) => {
            return <AuctionItem {...item} userId={localStorage.getItem("USER")} key={item._id} />
        })}
    </>
}
