import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    //q me diga si hay un error o no hay un error
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators()
    }, [ formState ])
    
    //validar todo el formulario y s eusa un useMemo xq quiero memrizar el valor
    //ya q algo puede cambiar en otro lado y se volveria reprocesar
    const isFormValid = useMemo(() => {
        //retornar un true o false si es valido el formulario
        //tomo el formValidation lo recorro buscando si alguno no tiene algo q no sea null
        for (const formValue of Object.keys(formValidation)) {
            if( formValidation[formValue] !== null ) return false;
        }  

        return true;
    }, [formValidation])

    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = ()=>{

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {
            const [fn, errorMessage="Este campo es requerido"] = formValidations[ formField ];
            
            //crear una propiedad computada para crear displayNameValid, etc
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
        //console.log( formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}

