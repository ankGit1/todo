import React, { useState } from 'react'
import './edit.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {
    const passTask = useLocation().state;
    const navigate = useNavigate();
    const [err,setErr] = useState();
    const [task, setTask] = useState({
        title: passTask.title,
        description: passTask.description,
        userId: passTask.user_id
    })

    const inputChange = (data) => {
        return setTask((prev) => {
            return { ...prev, ...data }
        })
    }

    const formSend = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/task/update/${passTask._id}`,task)
        .then((res)=>{
            setErr('')
            navigate('/todo/tasklist')
        })
        .catch((err)=>setErr('something went wrong'))
    }

    return (
        <div className='editMainDiv'>
            <h1>Update Task</h1>
            <div className='editFormDiv'>
                <form className='editForm' onSubmit={(e) => formSend(e)}>
                    <label htmlFor='title'>Title</label>
                    <input className='editInput' id='title' type='text' value={task.title}
                        onChange={(e) => inputChange({ title: e.target.value })} />
                    <label htmlFor='desc'>Description</label>
                    <textarea className='editTextArea' id='desc' type='text' value={task.description}
                        onChange={(e) => inputChange({ description: e.target.value })} />
                    <button type='submit' className='editButton'>UPDATE</button>
                    {err && <p style={{color:'red'}}>{err}</p>}
                </form>
            </div>
        </div>
    )
}

export default Edit