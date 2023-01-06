import { useEffect, useState } from "react";

const useForm = (defaultValue = {}) => {
  // form data
  const [form, setForm] = useState(defaultValue);

  // auto complite status
  const [autoComplite, setautoComplite] = useState(false);

  useEffect(() => {
    form.name.length > 0 ? setautoComplite(true) : setautoComplite(false);
  }, [form.name]);

  // onChange form data handler
  const onChangeHandler = (e) => {
    const { name, value, id } = e.target;
    if (name === "name") {
      setautoComplite(true);
    }
    if (id === "name")
      setForm((form) => ({ ...form, name: e.target.textContent }));
    if (name === "status")
      setForm((form) => ({ ...form, [name]: Number(value) }));
    else setForm((form) => ({ ...form, [name]: value }));
  };

  const reset = (value) => {
    setForm(value);
  };

  return {
    form,
    autoComplite,
    setautoComplite,
    onChangeHandler,
    reset,
  };
};

export default useForm;
