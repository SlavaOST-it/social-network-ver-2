import React, {FC, useEffect} from 'react';
import {Navigate} from "react-router-dom";

import s from "./UsersPage.module.scss";

import {UserItem} from "./userItem/UserItem";
import {followTC, getUsersThunkCreator, setCurrentPageAC, unFollowTC} from "../../bll/reducers/users-reducer";

import {AppStatus, UsersPageType} from "../../common/types/commonTypes";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {LinearProgress} from "../../common/components/linearProgress/LinearProgress";

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";


export const UsersPage: FC<UsersPageType> = ({type}) => {
    const dispatch = useAppDispatch()

    const usersData = useAppSelector(state => state.users.items)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const totalUsersCount = useAppSelector(state => state.users.totalUsersCount)

    const appStatus = useAppSelector(state => state.app.status)
    const loggedIn = useAppSelector(state => state.auth.loggedIn)


    useEffect(() => {
        dispatch(setCurrentPageAC({currentPage: 1}))
    }, [type])

    useEffect(() => {
        dispatch(getUsersThunkCreator(type === 'friends'))
    }, [currentPage, type])

    const onPageChanges = (currentPage: number) => {
        dispatch(setCurrentPageAC({currentPage}))
    }

    const changeFollowHandler = (userId: number) => {
        if (type === 'users') dispatch(followTC(userId))
        if (type === 'friends') dispatch(unFollowTC(userId))
    }

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.usersPage}>
            {appStatus === AppStatus.LOADING && <LinearProgress/>}
            <div>
                {usersData.map(users =>
                    <UserItem
                        key={users.id}
                        user={users}
                        changeFollowHandler={changeFollowHandler}
                        type={type}
                    />
                )}
            </div>

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
        </div>
    );
}
