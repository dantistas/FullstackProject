import React from "react";
import { ErrorMessage, Field, Form } from 'formik';



export const TextField = ({  field, label, placeholder}) => {

    return (
        <div>
            <label>{label}</label>
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
            <label>{label}</label>
            <Field style={{"height":"200px"}} className="textarea" as="textarea" placeholder={placeholder} {...field}/>
            <div style={{ color:'red' }}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}



export const FileUpload = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input className="input" onChange={(e)=>{
                if(!props.values.file){
                    props.setUploadedFile([...props.uploadedFile, e.target.files[0]])
                    props.values.file = e.target.files[0].name
                }else if(props.values.file){
                    const files = props.uploadedFile.filter(file=>file.name !== props.values.file)
                    props.setUploadedFile([...files, e.target.files[0]])
                    props.values.file = e.target.files[0].name
                }
                }} name="file" type="file"></input>
        </div>
    )
}


export const SelectField = ({validate, name, label, options}) =>{
    return (
        <div>
            {label}
            <div className="select">
                <Field as="select" name={name} style={{"width":"260px"}} validate={validate}>
                    <option value="" disabled selected>Please select an option</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </Field>
            </div>
        </div>
    )
} 


export const NumberField = ({ field, label, min, max, placeholder }) => {
    return (
        <div>
            <label>{label}</label>
            <Field className="input" {...field} placeholder={placeholder} type='number' min={min} max={max} />
            <div style={{ color:'red' }}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}

