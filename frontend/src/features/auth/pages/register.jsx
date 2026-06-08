import React,{useState} from 'react'
import {Link} from 'react-router'
import { useNavigate } from 'react-router';
import {useAuth} from '../hooks/useAuth';


function register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {loading, handleRegister} = useAuth();
    
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleRegister({username, email, password});
        navigate('/login');
        
    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e)=>setUsername(e.target.value)}
                    type="username" id="username" name="username" required placeholder="Enter your username" />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email" id="email" name="email" required placeholder="username@gmail.com" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password" id="password" name="password" required placeholder="******" />
                </div>

                <button className='button primary-button'>Register</button>

            </form>

            <div className="redirect-link">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>  
        </div>
    </main>
  )
}

export default register