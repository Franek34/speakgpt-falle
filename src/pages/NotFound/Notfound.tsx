import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="fixed w-full grid min-h-full place-items-center bg-[#40414f] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
          Strona nie znaleziona
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to="/"
          >
            Powrót do strony głównej
          </Link>

          <Link to="/" className="text-sm font-semibold text-gray-100">
            Poproś o pomoc <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
