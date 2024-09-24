import { Metadata } from "next";
import FormSection from "@/components/page-components/patient/auth/SignInPageSection";

export const metadata: Metadata = {
   title: "SignIn",
};
const SignIn = () => {
   return <FormSection />;
};

export default SignIn;
