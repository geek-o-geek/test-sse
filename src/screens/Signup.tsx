import React, { useState, useRef } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, valueSetter: React.Dispatch<React.SetStateAction<string>>) => {
        valueSetter(e.target.value);
    }

    const inputRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const goto = () => {
        navigate("/");
    }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={submitHandler}>
            <div style={styles.formElement}>
                <label style={{ marginBottom: 10 }} htmlFor="email">Email</label>
                <CustomInput ref={inputRef} inputHandler={inputHandler} value={email} type="email" onChange={(e) => inputHandler(e, setEmail)} />
            </div>
            <div style={styles.formElement}>
                <label style={{ marginBottom: 10 }} htmlFor="password">Password</label>
                <input style={{ padding: 10, width: '100%' }} type="email" value={password} onChange={(e) => inputHandler(e, setPassword)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CustomButton handleSubmit={submitHandler} btnName="SIGNUP" type="submit" />
                <CustomButton handleSubmit={goto} btnName="Go to LOGIN" type="button" />
            </div>
        </form>
    </div>
  )
}

export default Signup;

const styles: { [key: string]: React.CSSProperties } = {
    formElement: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 20
    },
    btn: {
        marginTop: 20,
        padding: 10,
        minWidth: 100,
        color: "white",
        background: "black",
        border: "1px solid black"
    }
}