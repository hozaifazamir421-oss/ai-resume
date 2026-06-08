import React,{useState} from 'react'
import '../auth.style.scss'
import {Link} from 'react-router'
import {useAuth} from '../hooks/useAuth';
import {useNavigate} from 'react-router';

function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {loading, handleLogin} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleLogin({email, password});
        navigate('/');
    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email" id="email" name="email" required placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password" id="password" name="password" required placeholder="Enter your password" />
                </div>
                <button className='button primary-button'>Login</button>

            </form>

            <div className="redirect-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    </main>
  )
}

export default login