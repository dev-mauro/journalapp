import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {}, formValidation = {} ) => {
  
  const [ formState, setFormState ] = useState( initialForm );
  const [validForm, setValidForm] = useState();

  useEffect(() => {
    createValidators();

  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [ name ]: value
    });

  }

  const createValidators = () => {
    const checkedValues = {};

    for (const formField of Object.keys(formValidation)) {
      const [fn, errorMessage] = formValidation[formField];
      
      checkedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    const isValid = isFormValid(checkedValues);

    setValidForm({...checkedValues, isValid});
  }

  const isFormValid = (values) => {
    for (const formField of Object.keys(values)) {
      if (values[formField] != null) return false;
    }

    return true;
  }

  const onResetForm = () => {
    setFormState( initialForm );
  }

  return {
    ...formState,
    ...validForm,
    formState,
    onInputChange,
    onResetForm,
  }
}

/*

{
  validForm: ,
  validPassword: ,
  validEmail: ,
  validName: ,
}

*/