import {Terminal} from './components/terminal'

function App() {

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <Terminal />
      </div>
    </div>
  )
}

export default App
