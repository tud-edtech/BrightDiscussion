import {ChangeEvent, FormEvent, useState} from 'react';

type StringObject = { [key: string]: string };

const setEmpty = <T extends StringObject>(obj: T) => Object.keys(obj).reduce(
    (accumulator, current) => {
        (accumulator as any)[current] = '';
        return accumulator
    }, {} as T);

const useForm = <T extends StringObject>(callback: (values: T) => void) => {

    const [values, setValues] = useState<T>({} as T);

    const handleSubmit = (event: FormEvent) => {
        if (event) event.preventDefault();
        const currentValues = values;
        setValues(setEmpty(values));
        callback(currentValues);
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    return {
        handleChange,
        handleSubmit,
        values,
    }
};

export default useForm;