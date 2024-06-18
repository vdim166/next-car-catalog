import carStore from "@/app/store/CarStore"
import { observer } from "mobx-react-lite"
import React from "react"
import { Pagination as BootstrapPagination } from "react-bootstrap"

type PaginationProps = {
  handlePageChange: (pageNumber: number) => void
}

export const Pagination = observer(({ handlePageChange }: PaginationProps) => {
  const { totalPages, page } = carStore

  const keys = new Array(totalPages)

  for (let i = 0; i < totalPages; i++) {
    keys[i] = i + 1
  }

  return (
    <BootstrapPagination>
      {keys.map((number) => (
        <BootstrapPagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  )
})
