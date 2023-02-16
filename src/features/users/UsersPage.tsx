import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {followTC, getUsersThunkCreator, setCurrentPageAC, unFollowTC} from "../../bll/reducers/users-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import s from "./UsersPage.module.scss";
import {UserItem} from "./userItem/UserItem";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {AppStatus} from "../../common/types/commonTypes";
import {LinearProgress} from "../../common/components/linearProgress/LinearProgress";


type UsersPageHOCType = {
    type: 'users' | 'friends'
}

export const UsersPage: FC<UsersPageHOCType> = ({type}) => {
    const dispatch = useAppDispatch()

    const usersData = useAppSelector(state => state.users.items)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const totalUsersCount = useAppSelector(state => state.users.totalUsersCount)
    const followingDisable = useAppSelector(state => state.users.followingDisable)

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
                        followingDisable={followingDisable}/>
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
