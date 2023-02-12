import React, {useEffect} from 'react';

import s from "./FriendsPage.module.scss"

import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {getUsersThunkCreator, setCurrentPageAC} from "../../bll/reducers/users-reducer";
import {UserItem} from "../users/userItem/UserItem";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";


export const FriendsPage = () => {
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
        dispatch(getUsersThunkCreator(true))
    }, [currentPage])

    const onPageChanges = (currentPage: number) => {
        dispatch(setCurrentPageAC({currentPage}))
    }

    const unFollowHandler = () => {

    }

    return (
        <div>
            <div>
                {usersData.map(users =>
                    <UserItem
                        key={users.id}
                        user={users}
                        follow={()=>{}}
                        unfollow={unFollowHandler}
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
