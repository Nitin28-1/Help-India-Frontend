import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Register } from "../Services/Operations/User.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    username: " ",
    email: " ",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user}=useSelector(store=>store.auth);
  const changeValues = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
 

    setLoading(true);
    await Register(input);
    setLoading(false);
    setInput({
        username: " ",
         email: " ",
       password: "",
    });
    navigate("/login");
  };

  useEffect(()=>
    {
      if(user)
      {
        return navigate("/");
      }
  
    },[])

  return (
    <div className="w-screen h-screen items-center flex justify-center">
      <form
        onSubmit={signUpHandler}
        className="shadow-lg p-8 flex-col flex gap-5"
      >
        <div className="flex flex-col items-center">
          <img className="w-30 h-28" src="Brand_logo.png" alt="" />
          <h3>Signup to make Impact inw world</h3>
        </div>

        <div>
          <span className="font-medium">Username </span>
          <Input
            type="text"
            className="focus-visible:ring-transparent"
            name="username"
            value={input.username}
            onChange={changeValues}
          />
        </div>
        <div>
          <span className="font-medium">Email </span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeValues}
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <span className="font-medium">Password </span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeValues}
            className="focus-visible:ring-transparent"
          />
        </div>


        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="my-4">
            SignUp
          </Button>
        )}

        <span className="text-center">
          Already Have An Account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
