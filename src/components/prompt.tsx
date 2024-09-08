import { ChevronRight, Clock, Folder, Server, User } from "lucide-react"


export default function Prompt() {
  return (
    <div className="flex items-center text-sm">
      <span className="bg-blue-600 text-gray-100 px-2 py-1 rounded-l-md flex items-center">
        <User size={12} className="mr-1" />
        <span className="hidden sm:inline text-xs">user</span>
      </span>
      <span className="bg-green-700 text-gray-100 px-2 py-1 flex items-center">
        <Server size={12} className="mr-1" />
        <span className="hidden sm:inline text-xs">dpeter.dev</span>
      </span>
      <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded-r-md flex items-center">
        <Clock size={12} className="mr-1" />
        <span className="text-xs">{new Date().toLocaleTimeString()}</span>
      </span>
      <ChevronRight size={14} className="text-gray-400 mx-1" />
    </div>
  )
}