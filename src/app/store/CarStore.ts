import { observable, action, makeObservable } from "mobx"
import axios from "axios"
import { carType } from "../Types"

export interface FilterState {
  brands: string[]
  models: string[]
  tariffs: string[]
}

class CarStore {
  shouldUpdate = true
  cars: carType[] = []
  filters: FilterState = {
    brands: [],
    models: [],
    tariffs: [],
  }
  page: number = 1
  totalPages: number = 1

  constructor() {
    makeObservable(this, {
      cars: observable,
      filters: observable,
      page: observable,
      totalPages: observable,
      setCars: action,
      setTotalPages: action,
      setPage: action,
      setFilters: action,
      fetchCars: action,
    })
  }

  setCars = (newCars: carType[]) => {
    this.cars = newCars
  }

  setTotalPages = (pages: number) => {
    this.totalPages = pages
  }

  setPage = (pageNumber: number) => {
    this.page = pageNumber
  }

  setFilters = (newFilters: FilterState) => {
    this.filters = newFilters
  }

  setShouldUpdate = (shouldUpdate: boolean) => {
    this.shouldUpdate = shouldUpdate
  }

  fetchCars = () => {
    if (this.shouldUpdate === false) return

    const params = new URLSearchParams()
    if (this.filters.brands && this.filters.brands.length > 0) {
      this.filters.brands.forEach((brand) => params.append("brand[]", brand))
    }
    if (this.filters.models && this.filters.models.length > 0) {
      this.filters.models.forEach((model) => params.append("model[]", model))
    }

    // Тарифы работает не корректно, так как сервер не реагирует на изменение параметра и также tarif приходит как пустой массив
    // if (filters.tariffs && filters.tariffs.length > 0) {
    //   filters.tariffs.forEach((tariff: string) => {

    //     params.append("tariff", tariff)
    //   })
    // }

    params.append("page", this.page.toString())

    axios
      .get<{ list: carType[]; pages: number }>(
        `https://test.taxivoshod.ru/api/test/?w=catalog-cars&${params.toString()}`
      )
      .then((response) => {
        if (this.shouldUpdate === true) {
          this.setShouldUpdate(false)
          this.setCars(response.data.list)
          this.setTotalPages(response.data.pages)
        }
      })
  }
}

const carStore = new CarStore()
export default carStore
