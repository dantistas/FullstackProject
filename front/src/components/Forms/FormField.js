import React from "react";
import { ErrorMessage, Field, Form } from 'formik';



export const TextField = ({  field, label, placeholder}) => {

    return (
        <div>
            <Field className="input" placeholder={placeholder} {...field}/>
            <div style={{ color:'red'}}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}

export const TextArea = ({field, label, placeholder}) => {
    return (
        <div>
            <Field className="textarea" as="textarea" placeholder={placeholder} {...field}/>
            <div style={{ color:'red' }}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}


export const FileUpload = (props) => {
    return (
        <div>
            <input className="input" onChange={(e=>props.setUploadedFile(e.target.files[0]))} name="file" type="file"></input>
        </div>
    )
}


export const SelectField = ({name, label, options}) =>{

    return (
        <div className="select">
            <Field as="select" name={name} style={{"width":"260px"}}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.label || option.value}
                    </option>
                ))}
            </Field>
        </div>
    )
} 


export const NumberField = ({ field, label, min, max, placeholder }) => {
    return (
        <div>
            <Field className="input" {...field} placeholder={placeholder} type='number' min={min} max={max} />
            <div style={{ color:'red' }}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}