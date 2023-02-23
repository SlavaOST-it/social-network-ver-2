import React, {FC, useEffect} from 'react';

import s from "./AddDialog.module.scss"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {getUsersThunkCreator, setCurrentPageAC} from "../../../bll/reducers/users-reducer";
import {UsersPageType} from "../../../common/types/commonTypes";
import basicAvatar from "../../../assets/img/icons/baseAvatar.jpg";


export const AddDialog: FC<UsersPageType> = ({type}) => {
    const dispatch = useAppDispatch()
    const friendsData = useAppSelector(state => state.users.items)
    const currentPage = useAppSelector(state => state.users.currentPage)

    const appStatus = useAppSelector(state => state.app.status)


    useEffect(() => {
        dispatch(setCurrentPageAC({currentPage: 1}))
    }, [type])


    useEffect(() => {
        dispatch(getUsersThunkCreator(type === 'friends'))
    }, [currentPage, type])


    return (
        <div className={s.addDialog}>




            <div className={s.usersList}>
                <h3>Выберите пользователя</h3>
                <ul>
                    {friendsData.map(user =>

                        <li className={s.userItem}>
                            <img
                                src={user.photos.large ? user.photos.large : basicAvatar}
                                alt={'user photo'}
                                className={s.avatar}
                            />
                            <span className={s.name}> {user.name} </span>
                            <input type={'radio'}/>
                        </li>)}
                </ul>

                <div className={s.buttonsGroup}>
                    <button>Создать чат</button>
                    <button>Отмена</button>
                </div>
            </div>



        </div>
    );
};
