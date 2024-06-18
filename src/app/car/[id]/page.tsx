"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container, Carousel, Button } from "react-bootstrap"
import { useRouter, useParams } from "next/navigation"
import { specificCarType } from "@/app/Types"
import { observer } from "mobx-react-lite"

const CarDetails = observer(() => {
  const router = useRouter()
  const { id } = useParams()

  const [car, setCar] = useState<specificCarType | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`)
        .then((response) => {
          setCar(response.data.item)
        })
    }
  }, [id])

  if (!car) return <div>Loading...</div>

  return (
    <Container>
      <h1 className="text-xl">
        {car.brand} {car.model}
      </h1>
      <Carousel>
        {car.images?.length > 0 ? (
          car.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image.image}
                className={`d-block w-100`}
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              src={
                "https://via.placeholder.com/300x200?text=No+Image+Available"
              }
              className={`d-block w-100`}
              alt="No image available"
            />
          </Carousel.Item>
        )}
      </Carousel>
      <p>Price: {car.price}</p>
      <p>Tariff: {car.tarif.length > 0 ? car.tarif[0] : "Неуказан"}</p>
      <Button variant="primary mt-2" onClick={() => router.back()}>
        Back
      </Button>
    </Container>
  )
})

export default CarDetails
