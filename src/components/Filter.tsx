import React, { useEffect } from "react"
import { Form, Row, Col } from "react-bootstrap"
import { observer } from "mobx-react-lite"
import axios from "axios"
import FilterStore from "../app/store/FilterStore"
import { ShowButton } from "./ShowButton"
import { filterState } from "@/app/Types"
import carStore from "@/app/store/CarStore"

type FilterProps = {
  onChange: (filters: filterState) => void
}

const Filter: React.FC<FilterProps> = observer(({ onChange }) => {
  const {
    brands,
    tariffs,
    selectedBrands,
    selectedModels,
    selectedTariffs,
    showBrands,
    showModels,
    showTariffs,
    setBrands,
    setModels,
    setTariffs,
    toggleShowBrands,
    toggleShowModels,
    toggleShowTariffs,
    setSelectedBrands,
    setSelectedModels,
    setSelectedTariffs,
    getFilteredModels,
  } = FilterStore

  const { shouldUpdate, setShouldUpdate } = carStore

  useEffect(() => {
    if (shouldUpdate) {
      axios
        .get("https://test.taxivoshod.ru/api/test/?w=catalog-filter")
        .then((response) => {
          const fetchedBrands: string[] = response.data.brands.values
          const sortedModels: { [key: string]: string[] } = {}
          const fetchedModels = response.data.models.values

          fetchedModels.forEach(
            (model: { brand: string; models: string[] }) => {
              sortedModels[model.brand] = model.models
            }
          )

          setBrands(fetchedBrands)
          setModels(sortedModels)
          setTariffs(Object.values(response.data.tarif.values))
        })
    }
  }, [])

  useEffect(() => {
    setShouldUpdate(true)
    onChange({
      brands: selectedBrands,
      models: selectedModels,
      tariffs: selectedTariffs,
    })
  }, [selectedBrands, selectedModels, selectedTariffs])

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    const updatedBrands = isChecked
      ? [...selectedBrands, value]
      : selectedBrands.filter((brand) => brand !== value)

    setSelectedBrands(updatedBrands)
  }

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    const updatedModels = isChecked
      ? [...selectedModels, value]
      : selectedModels.filter((model) => model !== value)

    setSelectedModels(updatedModels)
  }

  const handleTariffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    const updatedTariffs = isChecked
      ? [...selectedTariffs, value]
      : selectedTariffs.filter((tariff) => tariff !== value)

    setSelectedTariffs(updatedTariffs)
  }

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="brand">
            <Form.Label className="text-lg">Марки</Form.Label>
            <ShowButton show={showBrands} setShow={toggleShowBrands} />
            <div>
              {showBrands &&
                brands.map((brand) => (
                  <Form.Check
                    type="checkbox"
                    key={brand}
                    value={brand}
                    label={brand}
                    onChange={handleBrandChange}
                    checked={selectedBrands.includes(brand)}
                  />
                ))}
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="model">
            <Form.Label className="text-lg">Модели</Form.Label>
            <ShowButton show={showModels} setShow={toggleShowModels} />
            <div>
              {showModels &&
                getFilteredModels().map((model) => (
                  <Form.Check
                    key={model}
                    type="checkbox"
                    value={model}
                    label={model}
                    onChange={handleModelChange}
                    checked={selectedModels.includes(model)}
                  />
                ))}
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tariff">
            <Form.Label className="text-lg">Тариф</Form.Label>
            <ShowButton show={showTariffs} setShow={toggleShowTariffs} />
            <div>
              {showTariffs &&
                tariffs.map((tariff) => (
                  <Form.Check
                    type="checkbox"
                    key={tariff}
                    value={tariff}
                    label={tariff}
                    onChange={handleTariffChange}
                    checked={selectedTariffs.includes(tariff)}
                  />
                ))}
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
})

export default Filter
