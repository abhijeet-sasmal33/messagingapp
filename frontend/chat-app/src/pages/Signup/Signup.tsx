import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import image from "/signup.jpeg";
import axios from "axios";
import { useRef } from "react";

interface signupFormat {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const signup_click = (
  firstInput: HTMLInputElement | null,
  lastInput: HTMLInputElement | null,
  emailInput: HTMLInputElement | null,
  passInput: HTMLInputElement | null
) => {
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  if (
    emailInput &&
    passInput &&
    firstInput &&
    lastInput &&
    firstInput.value != "" &&
    lastInput.value != "" &&
    emailInput.value != "" &&
    passInput.value != ""
  ) {
    let data: signupFormat = {
      first_name: firstInput.value,
      last_name: lastInput.value,
      email: emailInput.value,
      password: passInput.value,
    };
    axios.post(backend_url + "/register", data).then((res) => {
      console.log(res);
    });
  } else {
    console.log("Null values in form");
  }
};

const Signup = () => {
  let emailInput = useRef<HTMLInputElement>(null);
  let passInput = useRef<HTMLInputElement>(null);
  let firstInput = useRef<HTMLInputElement>(null);
  let lastInput = useRef<HTMLInputElement>(null);

  return (
    <Card className="grid lg:grid-cols-2 md:grid-cols-1 md:w-2/4 w-3/4 h-3/4 pr-2 shadow-xl">
      <section
        id="login"
        className="grid-cols-1 bg-teal-200 hidden lg:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      ></section>
      <section id="signup" className="grid place-items-center px-2 h-full">
        <div className="w-3/4">
          <h1 className="scroll-m-20 grid-cols-1 text-4xl font-extrabold tracking-tight lg:text-5xl">
            SignUp
          </h1>
          <div className="grid-cols-1 mt-5 flex gap-1">
            <Input type="text" placeholder="First Name" ref={firstInput} />
            <Input type="text" placeholder="Last Name" ref={lastInput} />
          </div>
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
            onClick={() =>
              signup_click(
                firstInput.current,
                lastInput.current,
                emailInput.current,
                passInput.current
              )
            }
          >
            Submit
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default Signup;
