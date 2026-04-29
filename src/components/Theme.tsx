import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import CustomButton from './CustomButton';

function Theme({customBtnStyle}: {customBtnStyle?: React.CSSProperties}) {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    const handleClick = () => {
        document.documentElement.classList.toggle("dark", context?.theme === "dark");
        context.setTheme(context?.theme === "lite" ? "dark" : "lite");
    }
    
    return (
        <CustomButton customStyle={customBtnStyle} handleSubmit={handleClick} btnName="Change Theme" type="button" />
    )
}

export default Theme