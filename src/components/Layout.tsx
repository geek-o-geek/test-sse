import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from "react-router-dom";
import { apiCall } from '@/services/apicall';
import logo from "@/assets/react.svg";
import { ThemeContext } from '@/context/ThemeContext';
import Theme from './Theme';
import CustomButton from './CustomButton';
import type { AuthState } from '../types/auth';
import "@/styles/Layout.css";
function Layout({ children }: { children: React.ReactNode }) {
    const logout = useAuthStore((state: AuthState) => state.logout);
    const navigate = useNavigate();

    const { theme } : { theme: string } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
          await apiCall("/logout", {
                    method: "POST",
                    credentials: "include",
                }, false); 
        } catch (error) {
            console.log("error", error)
        } finally {
            logout();
            navigate("/");
        }
    }

    const getThemeStyle = () => {
        return theme === 'lite' ? styles.lite : styles.dark
    }

    return (
        <div style={{...getThemeStyle(), ...styles.wrapper}} className="App" data-theme={theme === 'lite' ? 'lite' : 'dark'}> 
            <div style={styles.navbar}>
                <img src={logo} />
                <div style={styles.links}>
                    <Link className="menu-link" to="/">Home</Link>
                    <Link className="menu-link" to="/products">Products</Link>
                    <Link className="menu-link" to="/cart">Cart</Link>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <Theme customBtnStyle={styles.btn}  />
                    <CustomButton 
                        customStyle={styles.btn} 
                        handleSubmit={() => handleLogout()} 
                        btnName="Logout" 
                        type="button" 
                    />
                </div>
            </div>
            <div style={{padding: "20px"}}>
                {children}
            </div>
        </div>
    )
}

export default Layout

const styles: { [key: string]: React.CSSProperties } = {
    dark: {
        background: 'var(--color-bg)',
        border: "1px solid var(--color-secondary)",
        color: 'var(--color-primary)'
    },
    lite: {
        background: 'var(--color-bg)',
        border: "1px solid var(--color-secondary)",
        color: 'var(--color-primary)'
    },
    wrapper: {
    },
    navbar: {
        padding: 10, 
        display: "flex", 
        gap: '10px', 
        justifyContent: "space-between",
        backgroundColor: 'var(--color-primary)'
    },
    btn: {
        margin: 0,
    },
    links: { 
        display: 'flex', 
        gap: '10px',
        textDecoration: "none"
    }
}