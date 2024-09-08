import { useEffect, useRef, useState } from "react"
import { commands } from "@/lib/commands"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import Prompt from "./prompt"

export const Terminal: React.FC = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const typeWriter = (text: string[], index: number = 0) => {
    if (index < text.length) {
      setIsTyping(true)
      setOutput(prev => [...prev, text[index]])
      setTimeout(() => typeWriter(text, index + 1), 30)
    } else {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    const initialMessage = [
      'Welcome to Diego Peter\'s Portfolio Terminal!',
      'Here\'s how to use this interactive portfolio:',
      '- Type \'help\' to see all available commands',
      '- Use \'about\' to learn more about me',
      '- Explore all my \'skills\' and \'projects\'', 
      '- Get in touch with me using the \'contact\' command',
      '- Try \'theme\' to switch between light and dark mode',
      '',
      'Feel free to explore and have fun!',
      '',
      'Type a command to get started:'
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


  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      const trimmedInput = input.trim().toLowerCase()
      const command = commands.find(cmd => cmd.name === trimmedInput)

      setOutput(prev => [...prev, `$ ${input}`])
      setInput('')

      if (command) {
        const result = command.action()
        if (command.name === 'clear') {
          setOutput([])
        } else if (command.name === 'theme') {
          setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
          typeWriter(result)
        } else {
          typeWriter(result)
        }
      } else {
        typeWriter([
          `Command not found: ${input}`,
          'Type \'help\' to see available commands.',
          '',
        ])
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Terminal - portfolio@dpeter.dev
        </CardTitle>
        <div className="flex space-x-2">
          <div className="size-3 bg-red-500 rounded-full"></div>
          <div className="size-3 bg-yellow-500 rounded-full"></div>
          <div className="size-3 bg-green-500 rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] w-full" ref={scrollAreaRef}>
          {output.map((line, index) => (
            <div key={index} className="mb-1 font-mono">
              {line}
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center mt-4">
          {/* <span className="text-green-500 mr-2 font-mono">$</span> */}
          <Prompt />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInput}
            className="flex-grow bg-transparent outline-none border-none shadow-none focus:ring-0 font-mono p-0"
            disabled={isTyping}
            ref={inputRef}
          />
        </div>
      </CardContent>
    </Card>
  )
}