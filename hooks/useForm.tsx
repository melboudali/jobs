import { type ChangeEvent, useState } from "react";
import type { useFormValues } from "@globalTypes";

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
