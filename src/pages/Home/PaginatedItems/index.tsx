import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { ITodo } from '../Home'
import { Items } from '../Items'

export function PaginatedItems({
  itemsPerPage,
  todosList,
}: {
  itemsPerPage: number
  todosList: ITodo[]
}) {
  const [currentItems, setCurrentItems] = useState<ITodo[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    setItemOffset(0)
  }, [todosList])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(todosList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(todosList.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, todosList])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % todosList.length
    setItemOffset(newOffset)
  }

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
