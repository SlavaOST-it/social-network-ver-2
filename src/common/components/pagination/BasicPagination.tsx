import React, {FC, useEffect, useState} from 'react';
import s from "./BasicPagination.module.scss"


type BasicPaginationType = {
    type: 'users' | 'friends'
    totalItemsCount: number,
    pageSize: number,
    onPageChanges: (pageNumber: number) => void,
    currentPage: number,
    portionSize: number
}
export const BasicPagination: FC<BasicPaginationType> = ({
                                                             type,
                                                             totalItemsCount,
                                                             pageSize,
                                                             onPageChanges,
                                                             currentPage,
                                                             portionSize
                                                         }) => {

        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const portionCount = Math.ceil(pagesCount / portionSize);

        const [portionNumber, setPortionNumber] = useState(1);

        useEffect(()=>{
            setPortionNumber(1)
        }, [type])

        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
        const rightPortionPageNumber = (portionNumber * portionSize);

        return (
            <div className={s.basicPagination}>
                {portionNumber > 1 &&
                    <button
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                        }}
                        className={s.btnNextPrev}
                    >
                        {'<<'} ПРЕД
                    </button>}

                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span key={p} className={currentPage === p ? s.pageSelected : s.numberPage}
                                     onClick={() => {
                                         onPageChanges(p)
                                     }}
                        >
                        {p}
                    </span>
                    })}

                {portionCount > portionNumber &&
                    <button
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                        }}
                        className={s.btnNextPrev}
                    >
                        СЛЕД {'>>'}
                    </button>}
            </div>
        );
    }
;
