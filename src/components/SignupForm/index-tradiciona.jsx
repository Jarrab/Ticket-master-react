import { useState } from "react"

const SignupForm = () =>{
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [address, setAdress] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [phone, setPhone] = useState("")

    const handleClearClick=()=>{
        setAdress("")
        setAge("")
        setName("")
        setPhone("")
        setZipcode("")
    }

    const handleFormSubmit=(evt)=>{
        evt.preventDefault()
    }

    return(
        <form onSubmit={handleFormSubmit}> 
            <label>
                name
                <input value={name} onChange={(evt) => setName(evt.target.value)} required/>
            </label>
            <label >
                Age 
                <input value={age} onChange={(evt) => setAge(evt.target.value)} required/>
            </label>
            <label>
                address 
                <input value={address} onChange={(evt) => setAdress(evt.target.value)} required/>
            </label>
            <label>
                Zipcode
                <input value={zipcode} onChange={(evt) => setZipcode(evt.target.value)} required/>
            </label>
            <label>
                Phone 
                <input value={phone} onChange={(evt) => setPhone(evt.target.value)} required/>
            </label>
            <div>
                <button type="button" onClick={handleClearClick}>Clear</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default SignupForm