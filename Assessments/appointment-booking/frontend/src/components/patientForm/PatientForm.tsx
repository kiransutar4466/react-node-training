import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import Input from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { CiCirclePlus } from "react-icons/ci";
import {
  addPatient,
  getAllProviderBySpecialization,
  getProviderById,
  updatePatient,
} from "@/services/provider";

interface PatientFormData {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  remark: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  doctor?: string;
}

type FieldType =
  | "text"
  | "email"
  | "radio"
  | "date"
  | "select"
  | "dynamicSelect";

interface Field {
  name: keyof PatientFormData;
  rules: Record<string, any>;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[];
}

export const PatientForm: React.FC = ({ formData, handleClose }) => {
  console.log(formData, "fuirhguhguio");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>();

  const [doctor, setDoctors] = useState([]);

  const [initialRendering, setInitialRendering] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fieldMap: Field[] = [
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
      name: "gender",
      rules: { required: "Gender is required" },
      type: "radio",
      label: "Gender",
      options: ["Male", "Female", "Other"],
    },
    {
      name: "remark",
      rules: { required: "Remark is required" },
      type: "text",
      label: "Remark",
      placeholder: "Enter remark",
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
      name: "dateOfBirth",
      rules: { required: "Date of birth is required" },
      type: "date",
      label: "Date of Birth",
      placeholder: "Select birth date",
    },
    {
      name: "address",
      rules: { required: "Address is required" },
      type: "text",
      label: "Address",
      placeholder: "Enter address",
    },

    {
      name: "specialization",
      rules: {},
      type: "select",
      label: "Preferred Consultant",
      placeholder: "Enter consultant name (if any)",
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
      name: "providerId",
      type: "dynamicSelect",
      label: "Doctors",
      placeholder: "Select Doctor",
      options: doctor,
    },
  ];

  const specialization = useWatch({ control, name: "specialization" });
  const onSubmit = async (data: PatientFormData) => {
    if (editMode) {
      const res = await updatePatient(formData.id, data);
      if (res.status === 200) {
        handleClose();
      }
    } else {
      const res = await addPatient(data);
      if (res.data) {
        handleClose();
      }
    }
  };

  useEffect(() => {
    const unwantedBFF = [
      "id",
      "createdAt",
      "updatedAt",
      "provider",
      "appointments",
    ];

    const isEditMode = JSON.stringify(formData) !== "{}";

    if (isEditMode) {
      for (const [key, value] of Object.entries(formData)) {
        if (!unwantedBFF.includes(key)) {
          setValue(key, value);
        }
      }
    }

    if (isEditMode) {
      const fetch = async () => {
        const res = await getProviderById(formData.provider.id);
        const { id, specialization: spcl } = res.data.result;
        setValue("specialization", spcl);
        setValue("providerId", id);
        setInitialRendering(true);
      };
      fetch();
    }
    setEditMode(isEditMode);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (specialization) {
        const res = await getAllProviderBySpecialization(specialization);
        const updatedSelect = res.data.result.map(
          ({ id, firstName, lastName }) => {
            return { value: id, option: firstName + " " + lastName };
          }
        );
        if (!initialRendering) {
          setValue("providerId", "");
        }
        setDoctors(updatedSelect);
        setInitialRendering(false);
      }
    };
    fetch();
  }, [specialization]);

  return (
    <div className="w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Registration</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-2  gap-x-4"
      >
        {fieldMap.map(
          ({
            name,
            rules,
            type,
            label,
            placeholder,
            options,
            defaultValue,
          }) => (
            <div key={name}>
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ""}
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
          )
        )}

        <Button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
        >
          {editMode ? "Update Patient" : "Add Patient"}
        </Button>
      </form>
    </div>
  );
};
