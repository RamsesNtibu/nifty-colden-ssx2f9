import "./App.css";
import React from "react";
import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./components/FormField";
import * as Yup from "yup";

interface UserSubmitForm {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const App: React.FC = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    username: Yup.string().required().min(6).max(20),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6).max(40),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const { data } = useQuery(["userTable"], (): UserSubmitForm => {
    const defaultVal: UserSubmitForm = {
      fullname: "ramses",
      username: "sesmar",
      email: "rr@rr.rr",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    };
    methods.reset(defaultVal);
    return defaultVal;
  });

  const methods = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => {
      if (data) {
        return data;
      }
    }, [data]),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="register-form">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormField.FormInput
            labelText={"User Name"}
            id={"username"}
            type={"text"}
            placeholder={""}
          />
          <FormField.FormInput
            labelText={"Full Name"}
            id={"fullname"}
            type={"text"}
            placeholder={""}
          />
          <FormField.FormInput
            labelText={"Email"}
            id={"email"}
            type={"text"}
            placeholder={""}
          />
          <FormField.FormInput
            labelText={"Password"}
            id={"password"}
            type={"password"}
            placeholder={""}
          />
          <FormField.FormInput
            labelText={"Confirm Password"}
            id={"confirmPassword"}
            type={"password"}
            placeholder={""}
          />
          <FormField.FormCheckbox
            labelText={"I have read and agree to the Terms"}
            id={"acceptTerms"}
            type={"checkbox"}
            placeholder={""}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              onClick={() => methods.reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default App;
