import { ChevronRight, Folder, Server, User } from "lucide-react"

interface PromptProps {
  currentDir: string
}

export default function Prompt({ currentDir }: PromptProps) {
  return (
    <div className="flex items-center text-sm mb-1">
      <span className="bg-emerald-500 text-emerald-900 px-2 py-1 rounded-l-md flex items-center">
        <User size={14} className="mr-1" />
        user
      </span>
      <span className="bg-sky-500 text-sky-900 px-2 py-1 flex items-center">
        <Server size={14} className="mr-1" />
        dpeter.dev
      </span>
      <span className="bg-amber-500 text-amber-900 px-2 py-1 rounded-r-md flex items-center">
        <Folder size={14} className="mr-1" />
        {currentDir}
      </span>
      <ChevronRight size={16} className="text-emerald-500 mx-1" />
    </div>
  )
}