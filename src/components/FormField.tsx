import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IFormFieldProps {
  labelText: string;
  id: string;
  type: string;
  placeholder: string;
}

const FormInput: React.FC<IFormFieldProps> = ({
  labelText,
  id,
  type,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <div className="mt-spacing-0.5 sm:mt-0 sm:col-span-2">
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`form-control ${errors[id] ? "is-invalid" : ""}`}
            />
          )}
        />
        <div className="invalid-feedback">{errors[id]?.message}</div>
      </div>
    </div>
  );
};

const FormCheckbox: React.FC<IFormFieldProps> = ({
  labelText,
  id,
  type,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="form-group">
      <div className="mt-spacing-0.5 sm:mt-0 sm:col-span-2">
        <input
          {...register(id)}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={`form-check-input ${errors[id] ? "is-invalid" : ""}`}
        />
        <label htmlFor={id} className="form-check-label">
          {labelText}
        </label>
        <div className="invalid-feedback">{errors[id]?.message}</div>
      </div>
    </div>
  );
};

const FormField = {
  FormInput,
  FormCheckbox,
};

export default FormField;
