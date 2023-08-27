import React from 'react'
import { create } from 'react-test-renderer'
import { Pagination } from './Pagination'

describe('Paginator component tests', () => {
  test('pages count is 11 but should be showed only 10', () => {
    const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} onPageChanged={() => {}} />)
    const root = component.root
    const spans = root.findAllByType('span')
    expect(spans.length).toBe(10)
  })

  test('if pages count is less then 10 button NEXT should not be present', () => {
    const component = create(<Pagination totalItemsCount={9} pageSize={1} portionSize={10} onPageChanged={() => {}} />)
    const root = component.root
    const button = root.findAllByType('button')
    expect(button.length).toBe(3)
  })
})