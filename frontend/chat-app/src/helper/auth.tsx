import Login from "@/pages/Login/Login";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const Auth = () => {
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refresh = localStorage.getItem("refresh");

      if (token) {
        try {
          const response = await axios.post(backend_url + "/auth","", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.msg) {
            setIsAuthenticated(true);
          } else {
            try {
              const response = await axios.post(
                backend_url + "api/token/refresh/",
                {
                  headers: {
                    Authorization: `Bearer ${refresh}`,
                  },
                }
              );
              if (response.data) {
                localStorage.setItem("token", response.data.access);
                localStorage.setItem("refresh", response.data.access);
                setIsAuthenticated(true);
              }
            } catch (error) {
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

 return (
  <>
  {isLoading ? <>Loading</> : isAuthenticated ? <Outlet /> : navigate('/login')}
  </>
 )
};

export default Auth;
