import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import './login.css'
import { searchToken } from '../redux/ToDoslice';

function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
    });
    const [err,serErr] = useState();
  
    const inputChange = (data) => {
      return setLoginInfo((prev) => {
        return { ...prev, ...data }
      })
    }
  
    const submitForm = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:5000/user/login',loginInfo)
      .then((res)=>{
        serErr('')
        setLoginInfo({email:'',password:''})
        localStorage.setItem('token',res.data);
        dispatch(searchToken())
        navigate('/todo/tasklist')
      })
      .catch((err)=>serErr('please enter valid email or password'))
    }
  
    return (
      <>
        <div className='LoginPage__topDiv'>
          <div className='LoginPage__title'>Sign In</div>
          {err && <p style={{color:'red'}}>{err}</p>}
          <form onSubmit={submitForm}>
            <div>
              <input type='email' placeholder='email'
                value={loginInfo.email} onChange={(e) => inputChange({ email: e.target.value })} />
            </div>
            <div>
              <input type='password' placeholder='password'
                value={loginInfo.password} onChange={(e) => inputChange({ password: e.target.value })} />
            </div>
            <button type='submit'>SUBMIT</button>
          </form>
        </div>
      </>
    )
}

export default LoginPage