import React, {FunctionComponent} from 'react';
import inputStyles from '../scss/modules/input.module.scss';

interface OwnProps {
    label: string;
    name: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    hasError?: boolean;
    errorMessage?: string | Array<string>;
}

type Props = OwnProps;

const Input: FunctionComponent<Props> = (props) => {
    const errorIsArray = Array.isArray(props.errorMessage);
    let errorList = null;
    if (errorIsArray && props.errorMessage !== undefined && typeof props.errorMessage !== "string") {
        errorList = React.createElement('ul', {className: `${inputStyles["input-group__error"]} ${inputStyles["input-group__error--list"]}`}, props.errorMessage.map((error: string, index: number) => {
            return React.createElement('li', {key: index}, error);
        }));
    }

    return (
        <div className={inputStyles["input-group"]}>
            <label className={inputStyles["input-group__label"]} htmlFor={props.name}>{props.label}</label>
            {props.type !== "textarea" &&
                <input className={`${inputStyles["input-group__input"]} ${props.hasError ? `${inputStyles["input-group__input--error"]}` : ""}`}
                       type={props.type}
                       name={props.name}
                       id={props.name}
                       onChange={props.onChange}
                       onBlur={props.onBlur}
                       value={props.value}/>
            }
            {props.type === "textarea" &&
                <textarea className={`${inputStyles["input-group__input"]} ${inputStyles["input-group__input--textarea"]} ${props.hasError ? `${inputStyles["input-group__input--error"]}` : ""}`}
                          name={props.name}
                          id={props.name}
                          onChange={props.onChange}
                          onBlur={props.onBlur}
                          value={props.value}/>
            }
            {props.hasError && !errorIsArray &&
                <span className={`${inputStyles["input-group__error"]}`}>{props.errorMessage}</span>}
            {props.hasError && errorIsArray && errorList}
        </div>
    );
};

export default Input;