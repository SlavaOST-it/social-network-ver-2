import React, {FC} from 'react';
import s from "./ButtonSend.module.scss"
import sendButtonLogo from "../../../assets/img/icons/send-03-svgrepo-com.svg";


type ButtonSendType = {
    id?: number
    callBack: (id?: number) => void
    className?: string
    disabled?: boolean,
}

export const ButtonSend: FC<ButtonSendType> = ({id, callBack, className, disabled}) => {
    return (
        <button
            className={className ? className : s.sendBtn}
            onClick={()=>callBack(id)}
            disabled={disabled}
        >
            <img src={sendButtonLogo} alt={"send"}/>
        </button>
    );
};
