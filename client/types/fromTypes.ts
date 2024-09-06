import { FC, FormEvent } from "react";
import { Control } from "react-hook-form";

export enum FormFieldType {
   INPUT = "input",
   TEXTAREA = "textarea",
   PHONE_INPUT = "phoneInput",
   CHECKBOX = "checkbox",
   DATE_PICKER = "datePicker",
   SELECT = "select",
   SKELETON = "skeleton",
   PASSWORD = "password",
}

export interface CustomProps {
   control: Control<any>;
   name: string;
   label?: string;
   placeholder?: string;
   iconSrc?: string;
   iconAlt?: string;
   disabled?: boolean;
   dateFormat?: string;
   showTimeSelect?: boolean;
   children?: React.ReactNode;
   renderSkeleton?: (field: any) => React.ReactNode;
   fieldType: FormFieldType;
   isLimited?: boolean;
   availableTimes?: string[];
   Icon?: FC<{ className?: string }>;
   doctor?: string;
   showDateText?:string;
}


export interface OtpFromProps {
   handleVerify:(e:FormEvent)=>void;
   handleResend:()=>void;
   timer:number;
   isLoading:boolean;
   otp:string;
   setOtp:(value:string)=>void;
}

