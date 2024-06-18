import { Dispatch, SetStateAction } from "react"

type ShowButtonProps = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

export const ShowButton = ({ show, setShow }: ShowButtonProps) => {
  return (
    <div className="cursor-pointer" onClick={() => setShow((prev) => !prev)}>
      {!show ? "Показать" : "Скрыть"}
    </div>
  )
}
