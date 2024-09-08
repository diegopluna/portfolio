import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import Prompt from "./prompt"
import { TerminalIcon } from "lucide-react"

type HistoryItem = {
  command: string
  output: string
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [input, setInput] = useState("")
  const [currentDir, setCurrentDir] = useState("~")
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const command = input.trim().toLowerCase()
    let output = ''

    switch (command) {
      case 'help':
        output = 'Available commands: help, clear, echo <message>, date, cd <directory>'
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'date':
        output = new Date().toString()
        break
      default:
        if (command.startsWith('echo ')) {
          output = command.slice(5)
        } else if (command.startsWith('cd ')) {
          const newDir = command.slice(3)
          setCurrentDir(newDir || '~')
          output = `Changed directory to ${newDir || '~'}`
        } else {
          output = `Command not found: ${command}. Type 'help' for available commands.`
        }
    }

    setHistory([...history, { command: input, output}])
    setInput('')
  }



  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <div className="bg-gray-800 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <TerminalIcon size={20} className="text-emerald-500 mr-2" />
          <span className="font-bold">dpeter.dev</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <Prompt currentDir={currentDir} />
            <div className="pl-4 text-emerald-300">{item.command}</div>
            <div className="pl-4 whitespace-pre-wrap text-gray-300">{item.output}</div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
        <div className="flex items-center">
          <Prompt currentDir={currentDir} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none ml-2 flex-grow text-emerald-300"
            ref={inputRef}
            autoFocus
            />
        </div>
      </form>
    </div>
  )
}