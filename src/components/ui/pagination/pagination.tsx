import { FC } from 'react'

import { clsx } from 'clsx'

import s from './pagination.module.scss'

import { ArrowLeft, ArrowRight } from '../../../assets'
import { usePagination } from './usePagination'

type PaginationConditionals =
  | {
      perPage?: null
      perPageOptions?: never
      onPerPageChange?: never
    }
  | {
      perPage: number
      perPageOptions: number[]
      onPerPageChange: (itemPerPage: number) => void
    }

export type PaginationProps = {
  count?: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: number) => void
} & PaginationConditionals

const classNames = {
  root: s.root,
  container: s.container,
  selectBox: s.selectBox,
  select: s.select,
  item: s.item,
  dots: s.dots,
  icon: s.icon,
  pageButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected)
  },
}

export const Pagination: FC<PaginationProps> = ({ onChange, count = 10, page = 1, siblings }) => {
  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  return (
    <div className={classNames.root}>
      <div className={classNames.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

        <MainPaginationButtons currentPage={page} onClick={handleMainPageClicked} paginationRange={paginationRange} />

        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const Dots: FC = () => {
  return <span className={classNames.dots}>&#8230;</span>
}
const PageButton: FC<PageButtonProps> = ({ onClick, disabled, selected, page }) => {
  return (
    <button onClick={onClick} disabled={selected || disabled} className={classNames.pageButton(selected)}>
      {page}
    </button>
  )
}
const PrevButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={classNames.item} onClick={onClick} disabled={disabled}>
      <ArrowLeft className={classNames.icon} />
    </button>
  )
}

const NextButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={classNames.item} onClick={onClick} disabled={disabled}>
      <ArrowRight className={classNames.icon} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({ paginationRange, currentPage, onClick }) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}
