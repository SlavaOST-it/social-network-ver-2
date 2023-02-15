import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import s from "./HeaderItem.module.scss";
import {AvatarUser} from "../../profile/avatar/AvatarUser";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrowDown from "../../../assets/img/icons/down-arrow-svgrepo-com.svg"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {logOutTC} from "../../../bll/reducers/auth-reducer";


export const HeaderItem = () => {
    const dispatch = useAppDispatch()
    const userName = useAppSelector(state => state.profile.profile?.fullName)


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl);

    const onClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onCloseHandle = () => {
        setAnchorEl(null);
    }

    const logOutHandle = () => {
        onCloseHandle()
       dispatch(logOutTC())
    }

    return (
        <div className={s.headerItem}>
            <div className={s.userName}>{userName}</div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickHandle}
            >
                <AvatarUser type={'my'} className={s.userAvatar}/>

                <img className={s.arrowDown} src={arrowDown} alt={'arrow menu'}/>

            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onCloseHandle}
                MenuListProps={{
                    'aria-labelledby': 'basic-buttons',
                }}
            >
                <MenuItem onClick={onCloseHandle}>
                    <NavLink to={PATH.profile} className={s.menuLink}>
                        Profile
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={logOutHandle}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};