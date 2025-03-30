import { Login } from "@/types/types";
import { axiosInstance } from "./axios";
import { isLoggedIn } from "@/utils/isLoggedIn";
// import axios from "axios";
// import { result } from "@/services/dummy/patient.json";
// import Patient from "@/pages/Patient";
export const providerLogin = async (data: Login) => {
  const res = await axiosInstance.post("provider/login", data);
  return res;
};

export const createProvider = async (data: unknown) => {
  const experience = Number(data.experience);
  const res = await axiosInstance.post(
    "provider",
    { ...data, experience: experience },
    {
      headers: {
        Authorization: `Bearer ${isLoggedIn()}`,
      },
    }
  );
  return res;
};

export const getAllProvider = async () => {
  const res = await axiosInstance.get(`provider`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const getProviderById = async (id) => {
  const res = await axiosInstance.get(`provider/${id}`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const getAllProviderBySpecialization = async (specialization) => {
  if (specialization) {
    const res = await axiosInstance.get(
      `provider?specialization=${specialization.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${isLoggedIn()}`,
        },
      }
    );
    return res;
  } else {
    return null;
  }
};

export const updateProvider = async (id, data) => {
  const res = axiosInstance.patch(`provider/${id}`, data, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const deleteProvider = async (id) => {
  const res = axiosInstance.delete(`provider/${id}`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const getAllPatients = async () => {
  // const data = {
  //   data: {
  //     result: result,
  //   },
  // };
  // console.log(data);
  // return data;
  const res = await axiosInstance.get(`patient`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const addPatient = async (formData) => {
  const { specialization, ...rest } = formData;
  const res = await axiosInstance.post(`patient`, rest, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const deletePatient = async (id) => {
  const res = await axiosInstance.delete(`patient/${id}`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const getPatientDetailsWithId = async (id) => {
  const res = await axiosInstance.get(`patient/${id}`, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};

export const updatePatient = async (id, data) => {
  const { specialization, ...rest } = data;
  const res = await axiosInstance.patch(`patient/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${isLoggedIn()}`,
    },
  });
  return res;
};
