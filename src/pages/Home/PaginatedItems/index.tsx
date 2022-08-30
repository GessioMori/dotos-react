import { useCallback, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useContextSelector } from 'use-context-selector'
import { ITodo, TodosContext } from '../../../contexts/TodoContext'
import { Items } from '../Items'

interface PaginatedItemsProps {
  itemsPerPage: number
}

export function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
  const todosList = useContextSelector(TodosContext, (context) => context.todos)
  const [currentItems, setCurrentItems] = useState<ITodo[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % todosList.length
      setItemOffset(newOffset)
    },
    [itemsPerPage, todosList],
  )

  useEffect(() => {
    setItemOffset(0)
  }, [])

  useEffect(() => {
    if (todosList.length <= itemsPerPage) {
      setItemOffset(0)
    }
  }, [todosList, itemsPerPage])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(todosList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(todosList.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, todosList])

  return (
    <>
      {currentItems?.length !== 0 && (
        <>
          <Items currentItems={currentItems} />
          {todosList.length > itemsPerPage && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="ᐅ"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={0}
              pageCount={pageCount}
              previousLabel="ᐊ"
              disabledClassName="disabled"
              activeClassName="active"
            />
          )}
        </>
      )}
    </>
  )
}
