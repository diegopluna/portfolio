import { useEffect, useRef, useState } from "react"
import { commands } from "@/lib/commands"
import { Card, CardContent  } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

export const Terminal: React.FC = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<{ text: string; color?: string }[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)  
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [matrixEffect, setMatrixEffect] = useState(false)
  const [particleEffect, setParticleEffect] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)

  const typeWriter = (text: { text: string; color?: string }[], index: number = 0, charIndex: number = 0) => {
    if (index < text.length) {
      if (charIndex < text[index].text.length) {
        setIsTyping(true)
        setOutput(prev => {
          const newOutput = [...prev]
          if (newOutput[newOutput.length - 1]?.text === text[index].text.slice(0, charIndex)) {
            newOutput[newOutput.length - 1] = {
              text: text[index].text.slice(0, charIndex + 1),
              color: text[index].color
            }
          } else {
            newOutput.push({
              text: text[index].text.slice(0, charIndex + 1),
              color: text[index].color
            })
          }
          return newOutput
        })
        setTimeout(() => typeWriter(text, index, charIndex + 1), 10)
      } else {
        setTimeout(() => typeWriter(text, index + 1, 0), 50)
      }
    } else {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    const initialMessage = [
      { text: 'Welcome to Diego Peter\'s Portfolio Console!', color: 'text-cyan-400' },
      { text: 'Type \'help\' to see available commands.' },
    ]
    typeWriter(initialMessage)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTyping])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    if (matrixEffect && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const fontSize = 14
      const columns = canvas.width / fontSize

      const drops: number[] = []
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#0F0'
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(Math.random() * 128)
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      const interval = setInterval(draw, 33)

      return () => clearInterval(interval)
    }
  }, [matrixEffect])


  useEffect(() => {
    if (particleEffect && particleCanvasRef.current) {
      const canvas = particleCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const particles: { x: number; y: number; radius: number; dx: number; dy: number }[] = []
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2
        })
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        for (const particle of particles) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fill()

          particle.x += particle.dx
          particle.y += particle.dy

          if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx
          if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy
        }

        requestAnimationFrame(draw)
      }

      draw()
    }
  }, [particleEffect, theme])


  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      const trimmedInput = input.trim().toLowerCase()
      const [commandName] = trimmedInput.split(' ')
      const command = commands.find(cmd => cmd.name === commandName)

      setOutput(prev => [...prev, { text: `${getPrompt()}${input}` }])
      setHistory(prev => [...prev, input])
      setHistoryIndex(-1)
      setInput('')

      if (command) {
        const result = command.action()
        if (command.name === 'clear') {
          setOutput([])
        } else if (command.name === 'theme') {
          setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
          typeWriter(result)
        } else if (command.name === 'matrix') {
          setMatrixEffect(prev => !prev)
          typeWriter(result)
        } else if (command.name === 'particles') {
          setParticleEffect(prev => !prev)
          typeWriter(result)
        } else if (command.name === 'glitch') {
          setGlitchEffect(prev => !prev)
          typeWriter(result)
        } else {
          typeWriter(result)
        }
      } else {
        typeWriter([
          { text: `Command not found: ${commandName}`, color: 'text-red-400' },
          { text: 'Type "help" to see available commands.' },
          { text: '' },
        ])
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        setHistoryIndex(prev => prev + 1)
        setInput(history[history.length - 1 - historyIndex - 1])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > -1) {
        setHistoryIndex(prev => prev - 1)
        setInput(historyIndex === 0 ? '' : history[history.length - 1 - historyIndex + 1])
      }
    }
  }

  const getPrompt = () => {
    return `guest@dpeter.dev:~$ `
  }

  return (
    <Card className={`w-full h-full max-w-4xl mx-auto overflow-hidden ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'} relative rounded-lg shadow-lg`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex items-center border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className={`text-sm mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>jane.doe@portfolio ~ Terminal</div>
      </div>
      <CardContent className="p-0 relative">
        {matrixEffect && (
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          />
        )}
        {particleEffect && (
          <canvas
            ref={particleCanvasRef}
            className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
          />
        )}
        <ScrollArea className="h-[calc(100vh-8rem)] w-full" ref={scrollAreaRef}>
          <div className={`p-4 font-mono text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} ${glitchEffect ? 'glitch' : ''}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {output.map((line, index) => (
              <div key={index} className={`mb-1 ${line.color || ''}`}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center">
              <span className="mr-2 text-green-400">{getPrompt()}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInput}
                className={`flex-grow bg-transparent border-none outline-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                disabled={isTyping}
                ref={inputRef}
              />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}