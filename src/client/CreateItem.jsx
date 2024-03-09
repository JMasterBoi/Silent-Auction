import { useState } from "react"
import { toastMessage } from "./main"
import axios from "axios"

export function CreateItem() {
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [startingBid, setStartingBid] = useState("")

    function createItemSubmit(e) {
        e.preventDefault()

        if (!itemName || !itemDescription || !startingBid) {
            toastMessage.fire({
                "icon": "error",
                "title": "One or more fields are empty"
            })
            return
        } else if (startingBid <= 0) {
            toastMessage.fire({
                "icon": "error",
                "title": "Please enter a starting bid greater than 0"
            })
            return
        }

        axios.post("/api/create-item", {
            itemName: itemName,
            itemDescription: itemDescription,
            startingBid: startingBid
        }).then((res) => {
            window.location.href = `/auction#${ res.data }`;
        })
    }

    return <>
        <h2>Create Item</h2>

        <form onSubmit={createItemSubmit}>
            <label htmlFor="item-name">Item Name</label>
            <input autoFocus placeholder="Gift Card Basket" type="text" name="item-name" id="item-name" value={itemName} onChange={e => {setItemName(e.target.value)}} />

            <label htmlFor="item-description">Short Item Description</label>
            <textarea placeholder="Basket full of assorted gift cards" name="item-description" id="item-description" rows="4" value={itemDescription} onChange={e => {setItemDescription(e.target.value)}}></textarea>

            <label htmlFor="starting-bid">Starting Bid</label>
            <input placeholder="$150" type="number" name="starting-bid" id="starting-bid" value={startingBid} onChange={e => {setStartingBid(e.target.value)}}/>

            <br />

            <button className="primary-btn btn-animation">Create Item</button>
        </form>
    </>
}