import React, {FC} from 'react';
import s from "./ButtonSend.module.scss"
import sendButtonLogo from "../../../assets/img/icons/send-03-svgrepo-com.svg";


type ButtonSendType = {
    callBack: () => void
    className?: string
}

export const ButtonSend: FC<ButtonSendType> = ({callBack, className}) => {
    return (
        <button
            className={className ? className : s.sendBtn}
            onClick={callBack}
        >
            <img src={sendButtonLogo} alt={"send"}/>
        </button>
    );
};
