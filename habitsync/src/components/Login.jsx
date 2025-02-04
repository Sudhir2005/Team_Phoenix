import React from "react";
import AuthForm from "./AuthForm";

const Login = ({ setIsAuthenticated }) => {
  return <AuthForm isSignup={false} setIsAuthenticated={setIsAuthenticated} />;
};

export default Login;
