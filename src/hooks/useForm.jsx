import { useEffect, useState } from 'react';

export default function useForm(defaultValue={}) {
  
  // form data
  const [form, setForm] = useState(defaultValue);
  
  // auto complite status
  const [autoComplite, setautoComplite] = useState(false);

  useEffect(() => {
    form.name.length > 0 ? setautoComplite(true) : setautoComplite(false);
  }, [form.name]);
  
  // onChange form data handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'status') setForm((form) => ({ ...form, [name]: Number(value) }));
    else setForm((form) => ({ ...form, [name]: value }));
  };
  
  return {form, autoComplite, setautoComplite, onChangeHandler};
}

