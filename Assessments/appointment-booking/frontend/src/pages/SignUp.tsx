// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import Input from "@/components/input/Input";
// import { Button } from "../components/button/Button";
// import { useNavigate } from "react-router-dom";

// interface DoctorFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: string;
//   gender: "Male" | "Female" | "Other";
//   specialization: string;
// }

// type FieldType = "text" | "email" | "password" | "select";

// interface Field {
//   name: keyof DoctorFormData;
//   rules: Record<string, any>;
//   type: FieldType;
//   label: string;
//   placeholder?: string;
//   options?: string[];
// }

// const fieldMap: Field[] = [
//   {
//     name: "firstName",
//     rules: { required: "First name is required" },
//     type: "text",
//     label: "First Name",
//     placeholder: "Enter first name",
//   },
//   {
//     name: "lastName",
//     rules: { required: "Last name is required" },
//     type: "text",
//     label: "Last Name",
//     placeholder: "Enter Last Name",
//   },
//   {
//     name: "email",
//     rules: {
//       required: "Email is required",
//       pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
//     },
//     type: "email",
//     label: "Email",
//     placeholder: "Enter email",
//   },
//   {
//     name: "password",
//     rules: {
//       required: "Password is required",
//       minLength: {
//         value: 6,
//         message: "Password must be at least 6 characters",
//       },
//     },
//     type: "password",
//     label: "Password",
//     placeholder: "Enter password",
//   },
//   {
//     name: "role",
//     rules: {
//       required: "UserType is required",
//     },
//     type: "select",
//     label: "UserType",
//     options: ["Admin", "Provider"],
//   },
// ];

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<DoctorFormData>();

//   const onSubmit = (data: DoctorFormData) => {
//     console.log("Form Data:", data);
//     navigate("/");
//   };

//   return (
//     <div className=" grid grid-cols-2 w-full h-[100vh] bg-gray-900">
//       <div className="  w-full flex justify-center items-center  p-6  shadow-md rounded-md">
//         <div className="w-2/3 px-10 py-12 bg-gray-100 rounded-2xl inset-shadow-yellow-600 shadow">
//           <h2 className="text-3xl font-bold mb-4 text-center  ">
//             Create Account
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {fieldMap.map(
//               ({ name, rules, type, label, placeholder, options }) => (
//                 <div key={name}>
//                   <Controller
//                     name={name}
//                     control={control}
//                     defaultValue=""
//                     rules={rules}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         type={type}
//                         label={label}
//                         placeholder={placeholder}
//                         options={options}
//                       />
//                     )}
//                   />
//                   {errors[name] && (
//                     <p className="text-red-500">{errors[name]?.message}</p>
//                   )}
//                 </div>
//               )
//             )}

//             <Button
//               variant="primary"
//               type="submit"
//               onClick={() => console.log("button clicked")}
//             >
//               Sign Up
//             </Button>
//           </form>
//         </div>
//       </div>
//       <div className="w-full bg-red-400"></div>
//     </div>
//   );
// };

// export default SignUp;

import { ProviderForm } from "@/components/providerForm";
import React from "react";

const SignUp = () => {
  return (
    <div>
      <ProviderForm />
    </div>
  );
};

export default SignUp;
