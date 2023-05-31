import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './task.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

function Task() {
    const user_id = useSelector((state) => state.user.userId)

    const [search, setSearch] = useState(null);
    const [task, setTask] = useState([]);
    const [err, setErr] = useState();
    const [change, setChange] = useState(false)

    useEffect(() => {
        const fetchTask = async () => {
            await axios.get(`http://localhost:5000/task/usertask/${user_id}`)
                .then((res) => {
                    setErr('')
                    setTask(res.data)
                })
                .catch((err) => setErr('getting difficulty in fetching data'))
        }
        fetchTask()
    }, [user_id, change])

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/task/deletetask/${id}`, { data: { userId: user_id } })
            .then((res) => {
                setErr('');
                setChange(prev => setChange(!prev))
            })
            .catch(() => setErr('something went wrong'))
    }

    const checkedInput = async (event, id) => {
        if (event.target.checked) {
            await axios.put(`http://localhost:5000/task/updatestatus/${id}`, { status: true })
                .then(() => setErr(''))
                .catch(() => setErr('something went wrong, try again'))
        } else {
            await axios.put(`http://localhost:5000/task/updatestatus/${id}`, { status: false })
                .then(() => setErr(''))
                .catch(() => setErr('something went wrong, try again'))
        }
    }

    return (
        <div className='taskMainDiv'>
            <h1>ToDo App</h1>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <div className='taskBoxDiv'>
                <Link className='createLink' to='/todo/create'><button>create</button></Link>
                <input className='searchBar' type='text' placeholder='search..'
                    onChange={(e) => setSearch(e.target.value)} />
                <div className='taskGroupDiv'>
                    {
                        task.length &&
                        task.filter((item)=>item.title.toLowerCase().includes(search?search:''))
                        .map((e, i) => {
                            return (
                                <div key={i} className='taskDiv'>
                                    <input type='checkbox' onClick={(event) => checkedInput(event, e._id)}
                                        defaultChecked={e.status} />
                                    <Link to='/todo/read' state={e}><h4>{e.title}</h4></Link>
                                    <Link to='/todo/edit' state={e}><i className="fa-solid fa-pen "></i></Link>
                                    <i onClick={() => deleteTask(e._id)} className="fa-solid fa-trash-can"></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Task