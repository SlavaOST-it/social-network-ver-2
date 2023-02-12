import React, {useEffect} from 'react';

import s from "./UsersPage.module.scss"

import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {UserItem} from "./userItem/UserItem";
import {followTC, getUsersThunkCreator, setCurrentPageAC} from "../../bll/reducers/users-reducer";


export const UsersPage = () => {
    const dispatch = useAppDispatch()

    const usersData = useAppSelector(state => state.users.items)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const totalUsersCount = useAppSelector(state => state.users.totalUsersCount)
    const followingDisable = useAppSelector(state => state.users.followingDisable)

    useEffect(()=>{
        dispatch(setCurrentPageAC({currentPage: 1}))
    }, [])

    useEffect(() => {
        dispatch(getUsersThunkCreator(false))
    }, [currentPage])

    const onPageChanges = (currentPage: number) => {
        dispatch(setCurrentPageAC({currentPage}))
    }

    const followHandler = (userId: number) => {
        dispatch(followTC(userId))
    }


    return (
        <div className={s.usersPage}>
            <div>
                {usersData.map(users =>
                    <UserItem
                        key={users.id}
                        user={users}
                        follow={followHandler}
                        unfollow={()=>{}}
                        followingDisable={followingDisable}/>
                )}
            </div>

            <div>
                <BasicPagination
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    onPageChanges={onPageChanges}
                    currentPage={currentPage}
                    portionSize={5}
                />
            </div>
        </div>
    );
};
