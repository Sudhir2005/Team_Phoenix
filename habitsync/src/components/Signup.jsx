import React from "react";
import AuthForm from "./AuthForm";

const Signup = ({ setIsAuthenticated }) => {
  return <AuthForm isSignup={true} setIsAuthenticated={setIsAuthenticated} />;
};

export default Signup;
