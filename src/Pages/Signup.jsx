import "./singnup.css";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAuth, useAuthActions, UserContext } from "../provider/AuthProvider";
import { useContext } from "react";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(2, "name length is invalid"),
  email: Yup.string().email("invalid email").required("email is required"),
  phoneNumber: Yup.string()
    .required("phone number is required")
    .matches(/^[0-9]{11}$/, "invalid phone number")
    .nullable(),
  password: Yup.string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: Yup.string()
    .required("password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  // const auth = useAuth();
  const setAuth = useAuthActions();
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);

  const onSubmit = (values) => {
    setAuth(values);
    navigate("/");
    login({ authLogin: !user.authLogin });

    toast.success(`${values.name} welcome!`, {
      theme: "colored",
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />

        <Input
          formik={formik}
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          submit
        </button>

        <Link to="/login">
          <p className="redirect-signup">Already Login ?</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
