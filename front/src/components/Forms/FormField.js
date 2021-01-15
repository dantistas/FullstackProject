import React from "react";
import { ErrorMessage, Field } from 'formik';



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