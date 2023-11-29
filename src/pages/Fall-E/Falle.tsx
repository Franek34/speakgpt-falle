/* eslint-disable no-await-in-loop */
import React, { useState } from "react"
import { AiFillThunderbolt, AiOutlinePicture } from "react-icons/ai"
import { IoSend } from "react-icons/io5"
import { Link } from "react-router-dom"
import "./falle.scss"

const Falle: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([])
  const [generating, setGenerating] = useState<boolean>(false)
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState<boolean>(false)

  const disableGenerateButton = () => {
    setLoading(true)
  }

  const enableGenerateButton = () => {
    setLoading(false)
  }

  const clearImage = () => {
    setImages([])
  }

  const downloadImage = (imgUrl: string, imageNumber: number) => {
    const link = document.createElement("a")
    link.href = imgUrl
    link.download = `image-${imageNumber + 1}.jpg`
    link.click()
  }

  const generateImages = async (input: string) => {
    if (generating) {
      return
    }
    setGenerating(true)

    try {
      disableGenerateButton()
      clearImage()
      setTextInput("")

      const apiKey = `${import.meta.env.VITE_DALLE_API_KEY}`
      const maxImages = 4

      for (let i = 0; i < maxImages; i += 1) {
        const randomNumber = Math.floor(Math.random() * 10000)
        const prompt = `${input} ${randomNumber}`

        const response = await fetch(
          "https://api-inference.huggingface.co/models/prompthero/openjourney",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ inputs: prompt }),
          },
        )

        if (!response.ok) {
          throw new Error("Failed to generate image!")
        }

        const blob = await response.blob()
        const imgUrl = URL.createObjectURL(blob)

        const img = document.createElement("img")
        img.src = imgUrl
        img.alt = `art-${i + 1}`
        img.onclick = () => downloadImage(imgUrl, i)

        setImages((prevImages) => [...prevImages, imgUrl])
        // console.log(response)
      }
    } finally {
      setGenerating(false)
      enableGenerateButton()
    }
  }

  const generateBtnClick = async () => {
    if (textInput.trim() !== "") {
      setIsEmptyErrorVisible(false); 
      await generateImages(textInput);
    } else {
      setIsEmptyErrorVisible(true); 
    }
  };

  const enterKeyCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !generating) {
      generateBtnClick()
    }
  }

  return (
    <div>
      <div className="pt-8 mx-4">
        <div className="choose-area sm:mx-auto w-full sm:w-96 bg-[#202123] rounded-xl">
          <div className="flex justify-between">
            <div className="choose-area__gpt flex justify-center items-center w-1/2 m-1 text-white  cursor-pointer hover:text-[#00df9a] transition">
              <Link
                className="flex items-center justify-center px-2 py-4 sm:px-10"
                to="/"
              >
                <AiFillThunderbolt /> SpeakGPT
              </Link>
            </div>
            <div className="choose-area__dalle flex justify-center items-center w-1/2 m-1  bg-[#40414f] text-white cursor-pointer rounded-xl  hover:bg-[#30313b] transition">
              <Link
                className="flex items-center justify-center px-2 py-4 sm:px-12"
                to="/falle"
              >
                <AiOutlinePicture /> &nbsp;FALL-E
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto mt-24 sm:w-3/4">
        <div className="relative w-11/12 mx-auto xl:w-3/5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl font-bold text-gray-500 sm:text-4xl md:text-6xl">
              FALL-E
            </h1>
            <div className="flex flex-col items-center justify-center my-4 mb-8 text-center">
              <p className="text-gray-400 md:text-lg text-md">
                Stwórz grafiki wpisując frazę poniżej
              </p>
              <p className="text-gray-400 md:text-lg text-md">
                <span className="font-bold">UWAGA: </span> Aplikacja działa
                tylko w języku angielskim!
              </p>
              <p className="text-gray-400 md:text-lg text-md">
                (Kliknij na jakiekolwiek zdjęcie, aby je pobrać)
              </p>
            </div>
          </div>
          <form>
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyUp={enterKeyCheck}
              placeholder="Porusz swoją wyobraźnią ..."
              className="input-bar flex justify-center items-center bg-[#40414f] rounded-xl shadow-xl w-full resize-none outline-none py-4 sm:py-5 ps-6 text-gray-400"
            />
          </form>
          <button
            onClick={generateBtnClick}
            disabled={loading}
            aria-label="send button"
            type="button"
            className="absolute p-1 text-gray-500 cursor-pointer right-5 bottom-3 sm:bottom-4"
          >
            <IoSend size={24} />
          </button>
        </div>
        {isEmptyErrorVisible && (
          <p className="text-center mt-3 text-red-400">
            Pole nie może być puste!
          </p>
        )}
      </div>

      <div className="result wrapper">
        <div className="result__loading" />
        <div className="result__img">
          {images.map((imgUrl, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <img
              key={imgUrl}
              src={imgUrl}
              alt={`art-${index + 1}`}
              onClick={() => downloadImage(imgUrl, index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Falle
