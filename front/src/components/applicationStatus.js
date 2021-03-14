import React, {useState} from 'react'
import axios from 'axios'



const ApplicationStatus = () => {
    const [status, setStatus] = useState(null)
    const [id, setId] = useState("")

    const checkStatus = async (e) => {
        const info = {
            id: id
        }
        e.preventDefault()
        setId("")
        await   axios.post('/api/check-status', info).then((res)=>{
            setStatus(res.data)
        })


    }

    return (
        <div>
            <form onSubmit={checkStatus}>
                {status ? <p>Status: {status}</p> : null}
                <input placeholder="please enter id which you received by the email" className="input" value={id} onChange={({ target }) => setId(target.value)}></input>
                <button type="submit" className="button is-success">submit</button>
            </form>
        </div>
    )

}


export default ApplicationStatus