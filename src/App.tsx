import Quote from "./components/Quote"
import { colors } from "./colors"
import { useEffect, useState } from "react"

function App() {
  const [colorIndex, setColorIndex] = useState(1)
  const [color, setColor] = useState('#FFB347')
  
  useEffect(() => {
    setColor(colors[colorIndex])
  }, [colorIndex])

  return (
    <>
    <main style={{ backgroundColor: color }} className="w-full h-screen flex items-center justify-center">
      <Quote
        color={color}
        setColorIndex={setColorIndex}
      />
    </main>
    </>
  )
}

export default App
