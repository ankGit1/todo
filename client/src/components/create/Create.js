import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const userId = useSelector((state) => state.user.userId);
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        user_id: userId
    })
    const [err,setErr] = useState()

    const inputChange = (data) => {
        return setTask((prev) => {
            return { ...prev, ...data }
        })
    }

    const formSend = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/task/taskpost',task)
        .then(()=>{
            setErr('');
            navigate('/todo/tasklist');
        })
        .catch(()=>setErr('something went wrong, try again'))
    }

    return (
        <div className='editMainDiv'>
            <h1>Create Task</h1>
            {err && <p style={{color:'red'}}>{err}</p>}
            <div className='editFormDiv'>
                <form className='editForm' onSubmit={(e) => formSend(e)}>
                    <label htmlFor='title'>Title</label>
                    <input className='editInput' id='title' type='text'
                        onChange={(e) => inputChange({ title: e.target.value })} />
                    <label htmlFor='desc'>Description</label>
                    <textarea className='editTextArea' id='desc' type='text'
                        onChange={(e) => inputChange({ description: e.target.value })} />
                    <button type='submit' className='editButton'>CREATE</button>
                </form>
            </div>
        </div>
    )
}

export default Create