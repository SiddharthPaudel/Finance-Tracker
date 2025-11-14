import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon,XIcon } from "lucide-react"; // npm install lucide-react

const Login = () => {
  const navigate=useNavigate();
  const handleClose=()=>{
    navigate("/")
  }
  const [showPassword, setShowPassword] = useState(false);
  const[visible,setVisible]=useState(true);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");

  if(!visible) return null;

  const handleLogin=async(e)=>{
    e.preventDefault();
    setError("")

    try{
      const res=await fetch("http://localhost:5000/api/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentialsL:"include",//important so cookies work 
        body:JSON.stringify({email,password}),
      });
      const data= await res.json();

      if(!res.ok){
        setError(data.message|| "Login Failed");
        return;
      }

      navigate("/dashboard");

    }catch(err){
      setError("Something went wrong ")
    }
    }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-[Poppins]">
      <div className="bg-white shadow-lg rounded-2xl px-10 py-12 w-full max-w-md relative">
        <button
          onClick={handleClose}
className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XIcon/>
        </button>
        <h2 className="text-3xl font-semibold text-center mb-9 text-gray-800">
          Welcome <span className="text-blue-500">Back</span>
          <p className="text-[10px] text-gray-500 mt-2">We missed you! Login to continue your journey with us.</p>
        </h2>
        
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with eye toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
