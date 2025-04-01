import { NavigateFunction } from "react-router-dom";

export type loginTypes={
    email:string
    password:string
   
    
}

export type authTypes={
   
    loading:boolean;
    userDetails:{};
    error:null;
    token:string|null
  
}

export type jwtPayloadData={
    user_id:string,
    fisrtName:string,
    lastName:string,
    token:string|null,
    role:string

}
export type EventType = {
    id: number;
    eventName: string;
    eventDescription: string;
    eventCategory: string;
    eventStartDate: Date;
    eventEndDate: Date;
    eventTimeSlots: string[];
    eventDaysOfWeeks: string[];
    eventTotalSeats: number;
    eventImage: string;
  
  };


 
  export interface EventData {
    userId: number|null;
    eventName: string;
    eventDescription: string;
    eventCategory: string;
    eventStartDate: Date|null;
    eventEndDate: Date|null;
    eventSlots: Array<{ day: string; startTime: string; endTime: string }>;
    eventTotalSeats: number | null;
    eventImage: string | null;
    eventPrice: number | null;
}

  

  export interface LoginActionPayload {
    data: loginTypes;
    navigate:NavigateFunction
  
  }
  export type RegistrationType={
    firstName:string;
    lastName:string;
    email:string,
    password:string,
    // confirmPassword:string,
    role:string
  }

  
  export type RegisterUserActionTypes={
      data:RegistrationType,
      navigate:Function
  }

  export const LOGIN_USER:string="LOGIN_USER"
  export const REGISTER_USER:string="REGISTER_USER"
  export const CREATE_EVENT:string=' CREATE_EVENT'
  export const GET_EVENT_BY_ID:string='GET_EVENT_BY_ID'
  export const DELETE_EVENT:string='DELETE_EVENT'
  export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
  export const UPDATE_EVENt:string="UPDATE_EVENt"
  export const GET_SHOWS:string="GET_SHOWS"
  export const GET_AVAILABLE_SEATS:string="GET_AVAILABLE_SEATS"