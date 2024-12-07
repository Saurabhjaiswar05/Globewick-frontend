import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const {email,password} = data;
    try {
      const response = await axios.post("http://localhost:8181/api/auth/login",{
        email,
        password
      })
      if(response.data.success){
        toast.success(response.data.message)
        navigate("/home");

      }else{
        toast.error(response.data.message)
      }
      // alert(response.data.message);
    } catch (error) {
      toast.error(error.response?.data.message)
      // alert(error.response?.data.message)
    }
    
  }

  return (
    <>
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='head'>Login</h1>
        <div className="firstLogin">
          {/* Email */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Email: </label>
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
            </div>
            <input
              type="email"
              className={errors.email ? "input-error" : "loginInputs"}
              {...register("email", { required: "Email is required",
                pattern:{
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:'enter a valid email'
                }
               })}
            />
            
          </div>

          {/* Password */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Password: </label>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}

            </div>
            <input
              type="password"
              className={errors.password ? "input-error" : "loginInputs"}
              {...register("password", { required: "Password is required" })}
            />
            
          </div>
        </div>

        {/* Submit Button */}
        <div className='forbuttons'>

        <input
          className="btn1"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Login..." : "Login"}
        />
        <Link to={"/"}>
        <button className="btn1"> Register  </button>
        </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
