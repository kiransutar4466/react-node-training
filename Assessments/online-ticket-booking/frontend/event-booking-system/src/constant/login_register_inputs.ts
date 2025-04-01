export const loginInputs = [
    { name: "email", label: "Email", type: "email",value:'',placeholder:'Enter eamil '},
    { name: "password", label: "Password", type: "password" ,value:'',placeholder:'Enter password '},
    

]

export const registrationInputs=[
    { name: "firstName", label: "First Name", type: "text" ,placeholder:"First name"},
    { name: "lastName", label: "Last Name", type: "text" ,placeholder:"Last name"},
    { name: "email", label: "Email", type: "email",placeholder:"Enter email" },
    { name: "password", label: "Password", type: "password",placeholder:"Enter password" },
    // { name: "confirmPassword", label: "Confirm Password", type: "password",placeholder:"Enter password" },
  
]
export const registrationState={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    // confirmPassword:'',
    role:'user'
}