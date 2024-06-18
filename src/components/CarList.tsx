import { carType } from "@/app/Types"
import carStore from "@/app/store/CarStore"
import { observer } from "mobx-react-lite"
import React from "react"
import { Card, Button, Row, Col } from "react-bootstrap"

type CarListProps = {
  onCarClick: (id: number) => void
}

const CarList = observer(({ onCarClick }: CarListProps) => {
  const placeholderImage =
    "https://via.placeholder.com/300x200?text=No+Image+Available"

  const { cars } = carStore

  return (
    <div className="mt-2">
      <Row>
        {cars.map((car) => (
          <Col key={car.id} xs={12} md={4} className="mb-3">
            <Card>
              <div
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
              >
                <Card.Img
                  variant="top"
                  src={car.image || placeholderImage}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Card.Body>
                <Card.Title>
                  {car.brand} {car.model}
                </Card.Title>
                <Card.Text>
                  Номер: {car.number}
                  <br />
                  Цена: {car.price}
                  <br />
                  Тариф: {car.tarif[0]}
                </Card.Text>
                <Button
                  className="mt-2"
                  variant="primary"
                  onClick={() => onCarClick(car.id)}
                >
                  Детали
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
})

export default CarList
