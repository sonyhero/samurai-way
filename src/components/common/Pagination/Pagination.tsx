import React from 'react';
import s from './PaginationCSS.module.css';

type PaginationType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
export const Pagination: React.FC<PaginationType> = (props) => {

    const {
        totalUsersCount,
        pageSize,
        currentPage,
        onPageChanged
    } = props

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const mappedPages = pages.map((p, index) => {
        return (
            <span key={index}
                  onClick={() => onPageChanged(p)}
                  className={(currentPage === p)
                      ? s.selectedPage
                      : s.usualSpan
                  }> {p} </span>)
    })

    return (
        <>{mappedPages}</>
    )
}