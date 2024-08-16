import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const auth = () => {
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refresh = localStorage.getItem("refresh");
      if (token) {
        try {
          const response = await axios.get(backend_url + "/auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data?.msg) {
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

  if (isAuthenticated) {
    return <></>;
  } else {
    return <div>auth</div>;
  }
};

export default auth;
