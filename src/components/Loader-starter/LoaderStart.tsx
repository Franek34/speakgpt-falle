import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"

const LoaderStart = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
    }

    fakeDataFetch()
  }, [])

  return isLoading ? <Loader /> : ""
}

export default LoaderStart
