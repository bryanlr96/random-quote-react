import { Dispatch, useEffect, useState } from "react"
import { colors } from "../colors"


type QuoteProps = {
  color: string;
  setColorIndex: Dispatch<React.SetStateAction<number>>
}

export default function Quote({ color, setColorIndex }: QuoteProps) {

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    fetch('/.netlify/functions/qotd') // requiere configuracion del proxy de netlify, para las redirecciones utilizamos el fichero qotd.js y netlify.toml
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote.body);
        setAuthor(data.quote.author);
      })
  }, []);


  const handleClick = async () => {
    setColorIndex(prev => (prev + 1) % colors.length)

    fetch('/.netlify/functions/qotd') // requiere configuracion del proxy de netlify, para las redirecciones utilizamos el fichero qotd.js y netlify.toml
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote.body);
        setAuthor(data.quote.author);
      })
  }


  return (
    <div className=" w-1/2 min-h-[50%] rounded-2xl p-6 shadow-2xl bg-white" id="quote-box">
      <div className="w-[80%] mx-auto flex flex-col gap-20 mt-[20px]">
        <p style={{ color }} className="text-center leading-relaxed font-bold text-xl" id="text">
          {quote}
        </p>
        <span style={{ color }} className="text-right italic font-bold" id="author">- {author}</span>
        <div className="flex justify-between w-full">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-[50px]" style={{ backgroundColor: color }}>
              <path fill="#fff" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-0.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,0.21,0,0.43,0,0.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" />
            </svg>
          </a>
          <button className="px-5 text-white font-bold cursor-pointer" style={{ backgroundColor: color }} onClick={handleClick} id="new-quote">New quote</button>
        </div>
      </div>
    </div>
  )
}
