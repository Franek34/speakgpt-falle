import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AiFillThunderbolt,
  AiOutlineClose,
  AiOutlinePicture,
} from "react-icons/ai"
import { IoSend } from "react-icons/io5"
import { FiSidebar } from "react-icons/fi"
import { GoPlus } from "react-icons/go"
import {
  BsFillChatSquareTextFill,
  BsReverseLayoutSidebarReverse,
} from "react-icons/bs"
import "./speakgpt.scss"
import OpenAI from "openai"
import gptLogo from "../../assets/GPTlogo.svg"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GPT_API_KEY,
  dangerouslyAllowBrowser: true,
})

const Speakgpt = () => {
  const [nav, setNav] = useState(true)
  const [userInput, setUserInput] = useState("")
  const [chatHistory, setChatHistory] = useState<any[]>([])

  const handleUserInput = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: "user", content: userInput },
    ])

    setUserInput("")
    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, { role: "assistant", content: userInput }],
      model: "gpt-3.5-turbo",
    })

    setChatHistory((prevChat) => [
      ...prevChat,
      { role: "assistant", content: chatCompletion.choices[0].message.content },
    ])
  }

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className={nav ? "w-80 z-40" : "hidden"}>
        <aside className="h-screen bg-[#202123]">
          <h1 className="flex items-center px-5 pt-4 mx-3 text-2xl font-bold text-gray-500">
            <BsFillChatSquareTextFill />
            &nbsp;SpeakGPT
          </h1>

          <div className="flex items-center justify-between w-full p-5 my-4">
            <button
              type="button"
              aria-label="button"
              className="flex items-center w-9/12 px-2 py-1 text-gray-300 transition border border-gray-500 border-solid rounded-lg text-md xl:text-lg pe-4 hover:bg-gray-700"
            >
              <GoPlus /> &nbsp; Nowy czat
            </button>
            <button
              onClick={() => setNav(false)}
              type="button"
              data-te-toggle="tooltip"
              data-te-placement="right"
              data-te-ripple-init
              data-te-ripple-color="light"
              title="click to hide"
              aria-label="button"
              className="flex items-center px-3 py-2 text-gray-300 transition border border-gray-500 border-solid rounded-lg text-md lg:text-lg hover:bg-gray-700"
            >
              <FiSidebar />
            </button>
          </div>

          <hr className="w-full" />

          <div className="flex flex-col items-center justify-center w-full p-5 mx-auto text-center text-gray-300">
            <h2 className="mb-5 text-xl font-bold text-gray-400">Historia</h2>

            <Link
              to="/"
              className="w-full p-2 mx-auto my-2 text-sm transition border border-gray-500 rounded-lg hover:bg-gray-700 xl: text-md"
            >
              Jak długo pamięta słoń?
            </Link>
            <Link
              to="/"
              className="w-full p-2 mx-auto my-2 transition border border-gray-500 rounded-lg hover:bg-gray-700"
            >
              Przepis na frytki
            </Link>
            <Link
              to="/"
              className="w-full p-2 mx-auto my-2 transition border border-gray-500 rounded-lg hover:bg-gray-700"
            >
              3 zasady savoir vivre
            </Link>
          </div>
        </aside>
      </div>

      <button
        onClick={() => setNav(true)}
        type="button"
        data-te-toggle="tooltip"
        data-te-placement="right"
        data-te-ripple-init
        data-te-ripple-color="light"
        title="click to hide"
        aria-label="button"
        className="fixed hidden p-2 text-lg text-white transition rounded-lg md:block left-3 top-3 lg:text-2xl hover:bg-gray-700"
      >
        <FiSidebar />
      </button>

      <div className="flex flex-col items-center mx-4 mt-12 md:mt-0 md:justify-between md:w-full">
        <div className="choose-area md:mx-auto w-full sm:w-96 bg-[#202123] rounded-xl mt-8">
          <div className="flex justify-between">
            <div className="choose-area__gpt flex justify-center items-center w-1/2 m-1 text-white  cursor-pointer rounded-xl bg-[#40414f] hover:bg-[#30313b] transition">
              <Link
                className="flex items-center justify-center py-4 px-10"
                to="/"
              >
                <AiFillThunderbolt /> SpeakGPT
              </Link>
            </div>
            <div className="choose-area__dalle flex justify-center items-center w-1/2 m-1 text-white cursor-pointer hover:text-[#00df9a] transition">
              <Link
                className="flex items-center justify-center py-4 px-12"
                to="/falle"
              >
                <AiOutlinePicture /> &nbsp;FALL-E
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col top-40 md:top-32 fixed sm:w-3/4 md:w-3/5 w-full mx-2 h-[650px] overflow-auto">
          {chatHistory.map((message, index) => (
            <div
              className="flex mb-4"
              key={message.id || `fallbackKey-${index}`}
            >
              <div
                className={`p-2 px-3 mx-4 inline-block ${
                  message.role === "user"
                    ? "h-10 w-10 bg-[#40414f] text-gray-300 rounded-l-lg rounded-tr-lg"
                    : "p-0 mx-0"
                }`}
              >
                {message.role === "user" ? (
                  "Ty"
                ) : (
                  <img className="w-10 h-10" src={gptLogo} alt="ChatGPT Logo" />
                )}
              </div>
              <div
                className={`w-full me-4 ${
                  message.role === "user"
                    ? "bg-[#40414f] text-gray-300"
                    : "bg-[#282831] text-gray-300"
                } p-2 rounded-md`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="block md:hidden">
          <button
            className="fixed p-1 text-gray-400 transition rounded-md cursor-pointer right-5 top-5 hover:bg-gray-600"
            onClick={handleNav}
            onKeyDown={handleNav}
            type="button"
            aria-hidden="true"
          >
            {nav ? (
              <AiOutlineClose size={24} />
            ) : (
              <BsReverseLayoutSidebarReverse size={24} />
            )}
          </button>

          <div
            className={
              nav
                ? "fixed flex flex-col left-0 top-0 w-[40%] h-screen border-r border-r-[#18181a] bg-[#202123] ease-in-out duration-500 z-10"
                : "fixed flex flex-col top-0 w-[40%] h-screen border-r border-r-[#18181a] bg-[#202123] ease-in-out duration-500 left-[-100%] z-10"
            }
          />
        </div>

        <div className="fixed flex flex-col w-full mx-2 mb-4 bottom-2 sm:w-3/4">
          <div className="relative w-11/12 mx-auto xl:w-3/5">
            <form onSubmit={handleUserInput}>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Wyślij wiadomość ..."
                className="input-bar flex justify-center items-center bg-[#40414f] rounded-xl shadow-xl w-full resize-none outline-none py-5 ps-6 text-gray-400"
              />
            </form>
            <button
              onClick={handleUserInput}
              aria-label="send button"
              type="button"
              className="absolute p-1 text-gray-500 cursor-pointer right-5 bottom-4"
            >
              <IoSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speakgpt
