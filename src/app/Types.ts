export type carType = {
  id: number
  image: string
  brand: string
  model: string
  number: string
  price: number
  tarif: string
}

export type specificCarType = {
  brand: string
  id: number
  images: { id: string; image: string }[]
  model: string
  price: number
  tarif: string[]
}

export type filterState = {
  brands: string[]
  models: string[]
  tariffs: string[]
}
