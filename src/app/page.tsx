"use client"
import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import Filter from "../components/Filter"
import CarList from "../components/CarList"
import { Pagination } from "@/components/Pagination"
import carStore, { FilterState } from "./store/CarStore"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"

const Home = observer(() => {
  const router = useRouter()

  const {
    fetchCars,
    filters,
    page,
    setFilters,
    setPage,
    shouldUpdate,
    setShouldUpdate,
  } = carStore

  useEffect(() => {
    fetchCars()
  }, [filters, page])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setShouldUpdate(true)
    setPage(pageNumber)
  }

  const handleCarClick = (id: number) => {
    router.push(`/car/${id}`)
  }

  return (
    <Container className="mb-2">
      <h1 className="text-3xl mb-3">Car Catalog</h1>
      <Filter onChange={handleFilterChange} />
      <CarList onCarClick={handleCarClick} />
      <Pagination handlePageChange={handlePageChange} />
    </Container>
  )
})

export default Home
