import { useEffect, useState } from 'react'
import axios from 'axios';
import { mySwal, toastMessage } from "../main"

export function AuctionItem({ _id, itemName, itemDescription, itemWorth, bids, userId }) {
    const [bidAmount, setBidAmount] = useState("")
    const [highestBid, setHighestBid] = useState(() => {
        // sorts bids and gets the largest
        return bids.sort((a, b) => a.amount - b.amount)[bids.length - 1]
    })

    function bidSubmit(e) {
        if (bidAmount <= highestBid.amount) {
            toastMessage.fire({
                icon: "error",
                title: `Please bid an amount higher than $${highestBid.amount}`
            })
            return
        } else {
            console.log("res")
            axios.post("/api/bid", {itemId: _id, userId: localStorage.getItem("USER"), amount: Number(bidAmount)}).then((res) => {
                console.log(res)
            })
        }
    }

    function removeBid(e) {
        axios.post("api/remove-bid", {amount: highestBid.amount, userId: userId, itemId: _id})
    }

    return <div id={_id}>
        <hr style={{margin: "5vw", borderColor: "darkgray"}} />
        <h3>{ itemName }</h3>
        <p><i>{ itemDescription }</i></p>
        <p>Item's Worth: <b>${ itemWorth }</b></p>
        <p>Current highest bid: <b>${ highestBid.amount }</b></p>
        <form onSubmit={bidSubmit} >
            <input type="number" name="bid-amount" placeholder={`$${ highestBid.amount + 10 }`} value={bidAmount} onChange={e => setBidAmount(e.target.value)} />
            <button className="primary-btn btn-animation">Bid</button>
        </form>

        {(highestBid.user.toString() == localStorage.getItem("USER")) && <form onSubmit={removeBid}>
            <br />
            <div className="flex-row">
                <button className="danger-btn btn-animation">Remove Your Bid</button>
            </div>
        </form>}
    </div>
}