import { Volunteer_Details } from "./volunteer_record";

export type Volunteer = {
    img : string;
    name: string;
    phone_no: string;
    email: string;
    doj: string;
    weekend_details : Volunteer_Details[]
    _id: string;
  };