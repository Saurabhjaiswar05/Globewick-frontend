import React from 'react'
import "../App.css";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {

  const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
      } = useForm();
    
      async function onSubmit(data) {
        const {
          firstName,
          lastName,
          email,
          countryCode,
          phoneNumber,
          password,
          confirmPassword,
          dateOfBirth,
          gender,
        } = data;
      if(password !==confirmPassword){
        toast.error("password & confirmPassword should be match");
        return
      }
        try {
          const response = await axios.post("http://localhost:8181/api/auth/register", {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNumber,
            password,
            dateOfBirth,
            gender,
          });

          if(response.data.success){
            toast.success(response.data.message);
            navigate("/login");
          }else{
            toast.error(response.data.message)
          }
          // console.log("Server response:", response.data);
          // alert("User registered successfully!");

        } catch (error) {

          // console.error("Error during registration:", error.response?.data || error.message);
          // alert(error.response?.data.message || "Failed to register the user");
          toast.error(error.response?.data.message);

        }

      }
      

  return (
    <>
    <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='head'>Register</h1>
        <div className="first">
          {/* First Name */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>First Name: </label>
            {errors.firstName && (
              <p className="error-msg">{errors.firstName.message}</p>
            )}
            </div>
            <input
              className={errors.firstName ? "input-error" : "inputs"}
              {...register("firstName", {
                required: "first name is required",
                minLength: { value: 3, message: "Min Length at least 3" }
              })}
            />
            
          </div>

          {/* Last Name */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Last Name: </label>
            {errors.lastName && (
              <p className="error-msg">{errors.lastName.message}</p>
            )}
            </div>
            <input
              className={errors.lastName ? "input-error" : "inputs"}
              {...register("lastName", {
                required: "last name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Last name is not as per our rule",
                },
              })}
            />
            
          </div>
        </div>

        <div className="first">
          
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
              className={errors.email ? "input-error" : "inputs"}
              {...register("email", { required: "email is required",
                pattern:{
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:'enter a valid email'
                }
               })}
            />
            
          </div>

          {/* Country Code */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Country Code: </label>
            {errors.countryCode && (
              <p className="error-msg">{errors.countryCode.message}</p>
            )}
            </div>
            <input
              type="text"
              className={errors.countryCode ? "input-error" : "inputs"}
              {...register("countryCode", { required: "country code is required",
                pattern:{
                  value:/^\+\d+$/,
                  message:"+ sign followed by numbers required"
                }
               })}
            />
            
          </div>
        </div>

        <div className="first">
          {/* Phone Number */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Phone Number: </label>
            {errors.phoneNumber && (
              <p className="error-msg">{errors.phoneNumber.message}</p>
            )}
            </div>
            <input
              type="number"
              className={errors.phoneNumber ? "input-error" : "inputs"}
              {...register("phoneNumber", { required: "phone number is required",
                pattern:{
                  value:/^\d{10}$/,
                  message:"required 10 digits"
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
              className={errors.password ? "input-error" : "inputs"}
              {...register("password", { required: "password is required" })}
            />
            
          </div>
        </div>

        <div className="first">
          {/* Confirm Password */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Confirm Password: </label>
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword.message}</p>
            )}
            </div>
            <input
              type="password"
              className={errors.confirmPassword ? "input-error" : "inputs"}
              {...register("confirmPassword", { required:"confirm password is required" })}
            />
            
          </div>

          {/* Date of Birth */}
          <div className="formdiv">
            <div className='errormerge'>

            <label>Date of Birth: </label>
            {errors.dateOfBirth && (
              <p className="error-msg">{errors.dateOfBirth.message}</p>
            )}
            </div>
            <input
              type="date"
              className={errors.dateOfBirth ? "input-error" : "inputs"}
              {...register("dateOfBirth", { required:"dob is required"})}
            />
            
          </div>
        </div>

        <div className="first">
          {/* Gender */}
          <div className="formdiv">
            <div className='errormerge'>
            <label>Gender: </label>
            {errors.gender && (
              <p className="error-msg">{errors.gender.message}</p>
            )}
            </div>
            <select
              className={errors.gender ? "input-error" : "inputs ginput"}
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            
          </div>
        </div>

        {/* Submit Button */}
        <div className='forbuttons'>

        <input className="btn1"
          type="submit" 
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Register"}
        />
        <Link to={"/login"}>
        <button className="btn1">Login  </button>
        </Link>
        </div>
      </form>
    </>
  )
}

export default Register
