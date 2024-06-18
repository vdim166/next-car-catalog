import "bootstrap/dist/css/bootstrap.min.css"
import { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  title: "Next Car Catalog",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
