import React, {FC, useEffect, useState} from 'react';

import s from "./AddDialog.module.scss"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {getUsersThunkCreator, setCurrentPageAC} from "../../../bll/reducers/users-reducer";
import {UsersPageType} from "../../../common/types/commonTypes";
import basicAvatar from "../../../assets/img/icons/baseAvatar.jpg";
import checkedLogo from "../../../assets/img/icons/check-circle-svgrepo-com.svg"
import {addNewDialogAC, changeSelectedStatusAC} from "../../../bll/reducers/dialogs-reducer";
import {UserType} from "../../../bll/reducers/reducersTypes/usersReducer-types";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";


type AddDialogType = {
    setValueDialogId: (userId: number) => void
}
export const AddDialog: FC<UsersPageType & AddDialogType> = ({type}) => {
    const dispatch = useAppDispatch()
    const friendsData = useAppSelector(state => state.users.items)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const totalUsersCount = useAppSelector(state => state.users.totalUsersCount)

    const appStatus = useAppSelector(state => state.app.status)
    const [selectedUserId, setSelectedUserId] = useState(0)

    const user = friendsData.find(u => u.id === selectedUserId)

    useEffect(() => {
        dispatch(setCurrentPageAC({currentPage: 1}))
    }, [type])


    useEffect(() => {
        dispatch(getUsersThunkCreator(type === 'friends'))
    }, [currentPage, type])

    const selectUserHandler = (userId: number) => {
        setSelectedUserId(userId)
    }

    const addNewDialog = (user: UserType) => {
        dispatch(addNewDialogAC({userName: user.name, avatar: user.photos.large}))
        dispatch(changeSelectedStatusAC({value: false}))
    }

    const cancellationHandler = () => {
        dispatch(changeSelectedStatusAC({value: false}))
    }

    const onPageChanges = (currentPage: number) => {
        dispatch(setCurrentPageAC({currentPage}))
    }

    return (
        <div className={s.addDialog}>


            <div className={s.usersList}>
                <h3>Выберите пользователя</h3>
                <ul>
                    {friendsData.map(user =>

                        <li
                            key={user.id}
                            className={s.userItem}
                            onClick={() => {
                                selectUserHandler(user.id)
                            }}>
                            <img
                                src={user.photos.large ? user.photos.large : basicAvatar}
                                alt={'user photo'}
                                className={s.avatar}
                            />
                            <span className={s.name}> {user.name} </span>
                            <img src={checkedLogo} alt={'checked'}
                                 className={user.id === selectedUserId ? `${s.activeChecked} ${s.checked}` : s.checked}/>
                        </li>)}
                </ul>

                <div className={s.buttonsGroup}>
                    <div>
                        <BasicPagination
                            type={type}
                            totalItemsCount={totalUsersCount}
                            pageSize={pageSize}
                            onPageChanges={onPageChanges}
                            currentPage={currentPage}
                            portionSize={5}
                        />
                    </div>

                    <button
                        disabled={selectedUserId === 0}
                        onClick={() => addNewDialog(user!)}
                        className={selectedUserId === 0 ? s.buttonBasic : s.addDialogButton}
                    >
                        Создать чат
                    </button>

                    <button
                        onClick={cancellationHandler}
                        className={s.buttonBasic}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};


