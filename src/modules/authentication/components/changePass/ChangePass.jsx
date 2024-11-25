import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { EMAIL_VALIDATION, passwordValidtion } from '../../../../services/validation';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { useNavigate } from 'react-router-dom';
import Header from '../../../shared/components/header/Header';

export default function ChangePass() {
  const[isPasswordVisible, setIsPasswordVisible] =useState(false);
  let navigate = useNavigate();
  

  let {register,
    formState:{errors},
    handleSubmit
  } = useForm();

  let changePass = (data) => {
    
    try {
      let response = axiosInstance.put(USERS_URLS.CHANGE_PASS,
      data
      );
      toast.success('Password has been updated successfully');
      
      navigate('/dashboard')
      console.log(data);
    } catch (error) {

      console.log(error);
      // toast.error(error.response.data.message);
    }
    
    handleClose()
  
}
  return (
    <>
    <Header title={'Categories items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
      
          <div className='w-75 m-5'>
            <div>
            <h2>Change password</h2>
          <form onSubmit={handleSubmit(changePass)}>
              <div className="input-group mb-2">
              
             <input
               type= {isPasswordVisible ? "text": "password"} 
              className="form-control"
              placeholder="old Password"
              aria-label="password"
               aria-describedby="basic-addon1"
               {...register('oldPassword',{
                required: 'password is required'
                
               })}
               />
              
             </div>
             
             <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <span className='sr-only'>{isPasswordVisible? "hide password" : "show password"}</span>
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
              {errors?.oldPassword &&<span className='text-danger'>{errors?.oldPassword?.message}</span>}
             <div className="input-group mb-2">
              
             <input
               type= {isPasswordVisible ? "text": "password"} 
              className="form-control"
              placeholder="new password"
              aria-label="password"
               aria-describedby="basic-addon1"
               {...register('newPassword',passwordValidtion)}
               />
              
             </div>
             
             <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <span className='sr-only'>{isPasswordVisible? "hide password" : "show password"}</span>
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
              {errors?.newPassword &&<span className='text-danger'>{errors?.newPassword?.message}</span>}
             <div className="input-group mb-2">
              
             <input
              type= {isPasswordVisible ? "text": "password"} 
              className="form-control"
              placeholder="confirm New Password"
              aria-label="password"
               aria-describedby="basic-addon1"
               {...register('confirmNewPassword',passwordValidtion)}
               />
              
             </div>
             
             <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <span className='sr-only'>{isPasswordVisible? "hide password" : "show password"}</span>
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
              {errors?.confirmNewPassword &&<span className='text-danger'>{errors?.confirmNewPassword?.message}</span>}
               <button className='btn btn-success w-100 my-2'>Save</button>
            </form>
          </div>
            </div>
            
         
       
    </>
  )
}
