import React, {FC} from 'react';
import s from "./ModalWindow.module.scss"
import {Box, Modal} from "@mui/material";


export const styleUserModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
};

type ModalWindowType = {
    active: boolean
    setActive: (active: boolean) => void
}
export const ModalWindow: FC<ModalWindowType> = ({active, setActive}) => {
    const handleClose = () => setActive(false)

    return (
        <Modal
            open={active}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleUserModal}>
                <div className={s.modal}>
                    <div className={s.modalHeader}>
                        <h2>User profile</h2>
                    </div>
                    <hr/>

                    <div>
                        {/*<img src={userItem.avatar && userItem.avatar.length > 100 ? userItem.avatar : customAvatar}*/}
                        {/*     alt={'avatar'} className={s.avatar}/>*/}
                    </div>

                    <div className={s.info}>

                    </div>
                </div>

                <div className={s.buttons}>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </Box>
        </Modal>
    );
}
