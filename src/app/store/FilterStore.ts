import { makeAutoObservable } from "mobx"

class FilterStore {
  brands: string[] = []
  models: { [brand: string]: string[] } = {}
  tariffs: string[] = []

  selectedBrands: string[] = []
  selectedModels: string[] = []
  selectedTariffs: string[] = []

  showBrands: boolean = false
  showModels: boolean = false
  showTariffs: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setBrands = (brands: string[]) => {
    this.brands = brands
    this.selectedBrands = brands.slice()
  }

  setModels = (models: { [brand: string]: string[] }) => {
    this.models = models
    this.selectedModels = Object.values(models).flat()
  }

  setTariffs = (tariffs: string[]) => {
    this.tariffs = tariffs
    this.selectedTariffs = tariffs.slice()
  }

  toggleShowBrands = () => {
    this.showBrands = !this.showBrands
  }

  toggleShowModels = () => {
    this.showModels = !this.showModels
  }

  toggleShowTariffs = () => {
    this.showTariffs = !this.showTariffs
  }

  setSelectedBrands = (brands: string[]) => {
    this.selectedBrands = brands
  }

  setSelectedModels = (models: string[]) => {
    this.selectedModels = models
  }

  setSelectedTariffs = (tariffs: string[]) => {
    this.selectedTariffs = tariffs
  }

  getFilteredModels = () => {
    return this.selectedBrands.flatMap((brand) => this.models[brand] || [])
  }
}

const filterStore = new FilterStore()

export default filterStore
