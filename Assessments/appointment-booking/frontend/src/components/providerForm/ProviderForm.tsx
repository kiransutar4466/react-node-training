import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { createProvider, updateProvider } from "@/services/provider";

interface ProviderFormData {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  remark: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  doctor?: string;
  name: string;
}

type FieldType = "name" | "text" | "email" | "radio" | "date" | "password";

interface Field {
  name: keyof ProviderFormData;
  rules?: Record<string, any>;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[];
}

export const ProviderForm: React.FC = ({ formData, handleClose }) => {
  console.log(formData, "bvubycidu");
  const isEditMode = JSON.stringify(formData) !== "{}";

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProviderFormData>();

  const onSubmit = async (data: ProviderFormData) => {
    if (isEditMode) {
      const res = await updateProvider(formData.id, data);
      if (res.data.status === 200) {
        handleClose();
      }
    } else {
      const res = await createProvider(data);
      if (res.data) {
        handleClose();
      }
      console.log("Patient Form Data:", data);
    }
  };

  useEffect(() => {
    const unwanted = ["id", "createdAt", "updatedAt"];

    if (isEditMode) {
      for (const [key, value] of Object.entries(formData)) {
        if (!unwanted.includes(key)) {
          setValue(key, value);
        }
      }
    }
  });

  let fieldMap: Field[] = [
    {
      name: "firstName",
      rules: { required: "First name is required" },
      type: "text",
      label: "First Name",
      placeholder: "Enter first name",
    },
    {
      name: "lastName",
      rules: { required: "Last name is required" },
      type: "text",
      label: "Last Name",
      placeholder: "Enter last name",
    },
    {
      name: "email",
      rules: {
        required: "Email is required",
        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
      },
      type: "email",
      label: "Email Address",
      placeholder: "Enter email address",
    },
    {
      name: "password",
      rules: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
      type: "password",
      label: "Password",
      placeholder: "Enter password",
    },

    {
      name: "contactNo",
      rules: {
        required: "Phone number is required",
      },
      type: "text",
      label: "Phone",
      placeholder: "Enter phone number",
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      options: ["Male", "Female", "Other"],
    },
    {
      name: "degree",
      rules: { required: "Degree is required" },
      type: "text",
      label: "Degree",
      placeholder: "Enter degree",
    },
    {
      name: "specialization",
      type: "select",
      label: "Specialist",
      options: [
        "Anesthesiology",
        "Cardiology",
        "Dermatology",
        "Endocrinology",
        "Gastroenterology",
        "General Surgery",
        "Gynecology",
        "Neurology",
        "Ophthalmology",
        "Orthopedics",
        "Pediatrics",
        "Psychiatry",
        "Radiology",
        "Surgery",
        "Urology",
      ],
    },
    {
      name: "experience",
      type: "text",
      label: "Experience",
      placeholder: "Enter experience in years",
    },
    {
      name: "role",
      type: "select",
      label: "UserType",
      options: ["Admin", "Provider"],
    },
    {
      name: "address",
      rules: { required: "Address is required" },
      type: "text",
      label: "Address",
      placeholder: "Enter address",
    },
  ];
  if (isEditMode) {
    fieldMap = fieldMap.filter(({ name }) => name !== "password");
  }
  return (
    <div className="w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Provider Registration</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-2   gap-x-4"
      >
        {fieldMap.map(({ name, rules, type, label, placeholder, options }) => (
          <div key={name}>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field }) => (
                <Input
                  {...field}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  options={options}
                />
              )}
            />
            {errors[name] && (
              <p className="text-red-500">{errors[name]?.message}</p>
            )}
          </div>
        ))}
        <div></div>
        <Button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
        >
          {isEditMode ? "Update Provider" : "Add Provider"}
        </Button>
      </form>
    </div>
  );
};
