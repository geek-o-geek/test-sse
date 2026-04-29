import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { apiCall } from '../services/apicall';
import { useAuthStore } from '../store/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setHandler = (flag: boolean) => setIsAuth(flag);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async() => {
        try {
          setLoading(true)
            const response = await apiCall("/me", {
                method: "GET",
                credentials: "include",
                headers: { 'Content-type': "application/json" }
            });

            console.log(response, "response")

            if(response?.email) {
                setHandler(true);
            } else {
                setHandler(false);
            }   
        } catch (error) {
            setHandler(false);
            setLoading(false);
        } finally {
          setLoading(false);
        }
    }

    checkAuth();
  }, []);

  if(isAuth === null || loading) {
    return <div>Loading...</div>
  }

  if(!isAuth) {
    return <Navigate to="/" />
  }
  
  return children;
}

export default ProtectedRoute