import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import sidebar from "/Designer.jpeg";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface loginFormat {
  username: string;
  password: string;
}
// const navigate = useNavigate();

const login_click = (
  emailInput: HTMLInputElement | null,
  passInput: HTMLInputElement | null
) => {
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  if (
    emailInput &&
    passInput &&
    emailInput.value != "" &&
    passInput.value != ""
  ) {
    let data: loginFormat = {
      username: emailInput.value,
      password: passInput.value,
    };
    axios.post(backend_url + "/api/token/", data).then((res) => {
      localStorage.setItem("token", res?.data?.access);
      localStorage.setItem("refresh", res?.data?.refresh);
      console.log('navigating to friends');
      axios.defaults.headers.common['Authorization'] = `Bearer ${res?.data?.access}`;
      // navigate('/friends');
    });
  } else {
    console.log("Null values in email/password");
  }
};

const Login = () => {
  let emailInput = useRef<HTMLInputElement>(null);
  let passInput = useRef<HTMLInputElement>(null);
  return (
    <div className="grid place-items-center h-screen ">
      <Card className="grid lg:grid-cols-2 md:grid-cols-1 md:w-2/4 w-3/4 h-3/4 pr-2 shadow-xl">
        <section
          id="login"
          className="grid-cols-1 bg-teal-200 hidden lg:block bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${sidebar})` }}
        ></section>
        <section id="signup" className="grid place-items-center px-2 h-full">
          <div className="w-3/4">
            <h1 className="scroll-m-20 grid-cols-1 text-4xl font-extrabold tracking-tight lg:text-5xl">
              SignIn
            </h1>
            <Input
              type="email"
              placeholder="Email"
              className="grid-cols-1 mt-5"
              ref={emailInput}
            />
            <Input
              type="password"
              placeholder="Password"
              className="grid-cols-1 mt-5"
              ref={passInput}
            />
            <Button
              type="submit"
              className="grid-cols-1 mt-5"
              onClick={() => login_click(emailInput.current, passInput.current)}
            >
              Login
            </Button>
            <div className="grid-cols-1 mt-[100px] w-100 text-center">
              New to Messaging?&nbsp;
            <Link to="/register" className="text-teal-500 font-medium">Register</Link>
            </div>
          </div>
        </section>
      </Card>
    </div>
  );
};

export default Login;
