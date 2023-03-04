import React, {FC} from 'react';
import s from "./ButtonSend.module.scss"
import sendButtonLogo from "../../../assets/img/icons/send-03-svgrepo-com.svg";


type ButtonSendType = {
    id?: number
    type?: "button" | "submit" | "reset" | undefined
    callBack: (id?: number) => void
    className?: string
    disabled?: boolean,
}

export const ButtonSend: FC<ButtonSendType> = ({id, type,callBack, className, disabled}) => {
    return (
        <button
            type={type}
            className={className ? className : s.sendBtn}
            onClick={()=>callBack(id)}
            disabled={disabled}
        >
            <img src={sendButtonLogo} alt={"send"}/>
        </button>
    );
};
