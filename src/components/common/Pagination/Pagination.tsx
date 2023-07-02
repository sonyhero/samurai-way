import React, {useState} from 'react';
import s from './PaginationCSS.module.css';
import {Button} from '../Button/Button';
import cn from 'classnames'

type PaginationType = {
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    currentPage?: number
    portionSize: number
}
export const Pagination: React.FC<PaginationType> = (props) => {

    const {
        totalItemsCount,
        pageSize,
        currentPage,
        onPageChanged,
        portionSize
    } = props


    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const portionCount = Math.ceil(pagesCount / portionSize)
    const lastPages = Math.ceil(totalItemsCount / portionSize / pageSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const mappedPages = pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
            return (
                <span className={
                    cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                      key={p}
                      onClick={() => {
                          onPageChanged(p);
                      }}>{p}</span>
            )
        })

    return (
        <div className={s.paginator}>
            <Button name={'Start'} callback={() => setPortionNumber(1)}/>
            <Button disabled={portionNumber === 1} name={'Prev'} callback={() => setPortionNumber(portionNumber - 1)}/>
            {mappedPages}
            {portionCount > portionNumber &&
                <Button name={'Next'} callback={() => setPortionNumber(portionNumber + 1)}/>}
            <Button name={'End'} callback={() => setPortionNumber(lastPages)}/>
        </div>
    )
}