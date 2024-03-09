import { useEffect, useState } from 'react'
import axios from 'axios';
import { mySwal, toastMessage } from "../main"

export function AuctionItem({ _id, itemName, itemDescription, bids }) {
    const [bidAmount, setBidAmount] = useState("")
    const [highestBid, setHighestBid] = useState(() => {
        // sorts bids and gets the largest
        return bids.sort((a, b) => a.amount - b.amount)[bids.length - 1]
    })

    function bidSubmit(e) {
        if (bidAmount <= highestBid.amount) {
            e.preventDefault()
            toastMessage.fire({
                icon: "error",
                title: `Please bid an amount higher than $${highestBid.amount}`
            })
        } else {
            console.log("res")
            axios.post("/api/bid", {itemId: _id, userId: localStorage.getItem("USER"), amount: Number(bidAmount)}).then((res) => {
                console.log(res)
            })
        }
    }

    return <div id={_id}>
        <h3>{ itemName }</h3>
        <p>{ itemDescription }</p>
        <p>Current price: <b>${ highestBid.amount }</b></p>
        <form onSubmit={bidSubmit} >
            <input type="number" name="bid-amount" placeholder={`$${ highestBid.amount + 10 }`} value={bidAmount} onChange={e => setBidAmount(e.target.value)} />
            <button className="primary-btn btn-animation">Bid</button>
        </form>
    </div>
}