import "./login.css";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAuth, useAuthActions, UserContext } from "../provider/AuthProvider";
import { useContext } from "react";

// 1.
const initialValues = {
  email: "",
  password: "",
};

// 3.
const validationSchema = Yup.object({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string().required("password is required"),
});

const Loging = () => {
  const auth = useAuth();
  // const setAuth = useAuthActions();
  const navigate = useNavigate();

  const { user, login } = useContext(UserContext);

  const onSubmit = (values) => {

    if (auth.email === values.email) {
      login({ authLogin: !user.authLogin });
      navigate("/");
      toast.success("welcome back! 🙋‍♀️", {
        theme: "colored",
      });

    } else {
      toast.error("something went wrong! 🙁", {
        theme: "colored",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <section className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />

        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />

        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          login
        </button>

        <Link to="/signup">
          <p className="redirect-login">Not SignUp Yet ?</p>
        </Link>
      </form>
    </section>
  );
};

export default Loging;
