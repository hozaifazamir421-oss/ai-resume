import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
});

export const register = async ({username, email, password})=>{
    try {
        const response = await api.post('/register',
             {username, email, password}
        );
        return response.data;
    } catch (error) {
        console.log('Registration error:', error);
    }
}


export const login = async ({email, password})=>{
    try {
        const response = await api.post('/login',
             {email, password}
        );
        return response.data;
    } catch (error) {
        console.log('Login error:', error);
    }
}

export const logout = async ()=>{
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.log('Logout error:', error);
    }
}

export const getCurrentUser = async ()=>{
    try {
        const response = await api.get('/get-me');
        return response.data;
    } catch (error) {
        console.log('Get current user error:', error);
    }
}

