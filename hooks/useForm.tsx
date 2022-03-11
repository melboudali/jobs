import { ChangeEvent, useState } from "react";
import { useFormValues } from "../types";

const useForm = (defaults: useFormValues) => {
   const [values, setValues] = useState(defaults);

   const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
      let { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

   const clearValues = () => {
      setValues(defaults);
   };

   return { values, updateValue, clearValues };
};

export default useForm;
