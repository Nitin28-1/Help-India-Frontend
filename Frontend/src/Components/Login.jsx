import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { login} from "../Services/Operations/User.js"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: " ",
    password: "",
  });
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const {user}=useSelector(store=>store.auth);
  const changeValues = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const signUpHandler = async (e) => {
    e.preventDefault();
 

     setLoading(true);
     const userData= await login(input);
 

     if(userData)
     {
      dispatch(setAuthUser(userData));
      setInput({

        email: " ",
        password: "",
       })
       navigate("/");
     }
     setLoading(false);
    
    
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
        <div className="flex flex-col">
        <img className="w-22 h-28" src="Brand_logo.png" alt="" />
          <h3>Log int to make Impact in world...</h3>
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
        
        {
          loading ? (<Button> 
             
             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
             Please Wait
              </Button> ) : (        <Button type="submit" className="my-4" >Login</Button>)
        }

        <span className="text-center">Not have An Account? <Link to={'/signup'} className="text-blue-600">SignUp</Link></span>
      </form>
    </div>
  );
};

export default Login;
