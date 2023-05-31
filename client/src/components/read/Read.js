import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Read() {
    const passTask = useLocation().state;

    const navigate = useNavigate();
    
    return (
        <div className='editMainDiv'>
            <h1>Task Info</h1>
            <div className='editFormDiv'>
                <div className='editForm'>
                    <label htmlFor='title'>Title</label>
                    <input className='editInput' id='title' type='text' defaultValue={passTask.title} disabled/>
                    <label htmlFor='desc'>Description</label>
                    <textarea className='editTextArea' id='desc' type='text' defaultValue={passTask.description} disabled/>
                    <div className='editExtra'>
                        <p>status: <span style={{color: 'green'}}>{passTask.status===true? 'completed' : 'active'}</span></p>
                        <p>createdAt: {new Date(passTask.createdAt).toDateString()}</p>
                    </div>
                    <button className='editButton' onClick={()=>navigate('/todo/tasklist')}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Read