import { toast } from 'react-toastify';
import { loginTypes, RegistrationType } from '../types/types';

export const validateLoginData = (loginData: loginTypes) => {
  const { email, password } = loginData;

  if (!email.trim() && !password.trim()) {
    toast.error('Please enter both email and password.');
    return false;
  }
  if (!email.trim()) {
    toast.error('Please enter your email.');
    return false;
  }
  if (!password.trim()) {
    toast.error('Please enter your password.');
    return false;
  }


  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  //   if (!passwordRegex.test(password)) {
  //     toast.error(
  //       'Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.'
  //     );
  //     return false;
  //   }

  return true;
};

export const registerFormValidation = (registrationData: RegistrationType) => {
  const { firstName,
    lastName,
    email,
    password } = registrationData

  if (firstName.trim() === "") {
    toast.error('Please enter your First Name.');
    return false;
  }
  if (lastName.trim() === "") {
    toast.error('Please enter your Last Name.');
    return false;
  }
  if(email.trim()==='')
  {
    toast.error('Please enter your email.');
  }
  // if (password.trim() !== confirmPassword.trim()) {
  //   toast.error("Password and Confirm Password dis not Match")
  //   return false;
  // }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.'
      );
      return false;
    }
  return true
}