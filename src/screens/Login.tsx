import React, { useState } from 'react'
import { apiCall } from '@/services/apicall';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from "react-router-dom";
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import type { AuthState } from '@/types/auth';
import type { User } from '../types/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setError] = useState("");

    const navigate = useNavigate();

    const setIsAuth = useAuthStore((state: AuthState) => state.setIsAuth);
    const handler = () => setIsAuth(true);

    const setUser = useAuthStore((state: AuthState) => state.setUser);
    const handleUser = (user: User) => setUser(user);

    const goto = () => {
        navigate("/signup");
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        if(!email || !password) {
            return alert("all fields are required");
        }

        const data = {
            email,
            password,
            role: "admin"
        }

        try {
            const response = await apiCall("/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            if(response?.user) {
                setError("");
                setEmail("");
                setPassword("");
                setSuccess(true);

                handler();
                handleUser(response.user);

                navigate("/products");
            }
            
        } catch(error: unknown) {
            setSuccess(false);

            if (error instanceof Error) {
                setError(error.message);   
            } else {
                setError("Something went wrong");
            }
        }
    }

  return (
    <div className='container' style={{ maxWidth: 300, margin: "0 auto" }}>
      <h1>login</h1>
      { success && <p>successful login</p> }
      { errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p> }
      <form onSubmit={handleSubmit}>
        <div style={styles.formElement}>
            <label>Email</label>
            <CustomInput type="email" value={email} inputHandler={(e: React.ChangeEvent<HTMLFormElement>) => setEmail(e.target.value)} />
        </div>
        <div style={styles.formElement}>
            <label>Password</label>
            <CustomInput type="password" value={password} inputHandler={(e: React.ChangeEvent<HTMLFormElement>) => setPassword(e.target.value)} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CustomButton handleSubmit={handleSubmit} btnName="LOGIN" type="submit" />
            <CustomButton handleSubmit={goto} btnName="Go to SIGNUP" type="button" />
        </div>
      </form>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
    formElement: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        marginTop: 20,
        maxWidth: "100%"
    }
}


export default Login