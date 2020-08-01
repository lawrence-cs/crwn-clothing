import React from 'react';
import './form-input.styles.scss';

const FormInput = ({handleChange, label, ...otherProps}) => {
    return(
        <div className="group">
            <input className='form-input' onChange={handleChange} {...otherProps} />
            {
                label ?
                    (
                        //If props.value.length is true, apply' shrink as classname. Else, ''
                        <label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                            {label}
                        </label>
                    )
                : null
            }
        </div>
    )
}

export default FormInput;