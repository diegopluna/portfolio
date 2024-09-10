type Command = {
  name: string
  description: string
  action: () => {text: string; color?: string}[]
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'List all available commands',
    action: () => [
      {text: 'Available commands:', color: 'text-cyan-400'},
      { text: 'about     - Display information about me' },
      { text: 'skills    - List my technical skills' },
      { text: 'projects  - Show my project portfolio' },
      { text: 'contact   - Display my contact information' },
      { text: 'clear     - Clear the terminal screen' },
      { text: 'theme     - Toggle light/dark mode' },
      { text: 'matrix    - Toggle Matrix effect' },
      { text: 'particles - Toggle particle effect' },
      { text: 'glitch    - Toggle glitch effect' },
    ]
  },
  {
    name: 'about',
    description: 'Display information about me',
    action: () => [
      {text: 'Diego Peter', color: 'text-yellow-400'},
      {text: 'Software Engineer', color: 'text-yellow-400'},
      {text: 'Passionate about learning and developing new things.'},
      {text: 'I am currently working as a Software Developer Intern at Pitang.'},
    ]
  },
  {
    name: 'skills',
    description: 'List my technical skills',
    action: () => [
      { text: 'Technical Skills:', color: 'text-cyan-400' },
      { text: '- JavaScript / TypeScript'},
      { text: '- React / Next.js'},
      { text: '- Node.js / Express / Nest.js'},
      { text: '- Python / Flask / Django'},
      { text: '- Golang'},
      { text: '- Java / Spring Boot'},
    ]
  },
  {
    name: 'projects',
    description: 'Show my project portfolio',
    action: () => [
      { text: 'Project Portfolio:', color: 'text-cyan-400' },
      { text: '1. Vitaes', color: 'text-yellow-400' },
      { text: '   A web application that allow users to build their own resume. Built with Next.js.'},
      { text: '   GitHub: github.com/diegopluna/vitaes'},
      { text: '   URL: vitaes.io'},
      { text: '2. Portfolio Website', color: 'text-yellow-400'},
      { text: '   Personal portfolio website built with React and Vite.'},
      { text: '   GitHub: github.com/diegopluna/portfolio'},
      { text: '   URL: dpeter.dev'},
    ]
  },
  {
    name: 'contact',
    description: 'Display my contact information',
    action: () => [
      { text: 'Contact Information:', color: 'text-cyan-400' },
      { text: 'Email: diegopeter@dpeter.dev'},
      { text: 'GitHub: github.com/diegopluna'},
      { text: 'LinkedIn: linkedin.com/in/diegopeter'},
    ]
  },
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    action: () => []
  },
  {
    name: 'theme',
    description: 'Toggle light/dark mode',
    action: () => [{ text: 'Theme toggled. The change will be applied immediately.', color: 'text-yellow-400' }],
  },
  {
    name: 'matrix',
    description: 'Toggle Matrix effect',
    action: () => [{ text: 'Matrix effect toggled.', color: 'text-green-400' }],
  },
  {
    name: 'particles',
    description: 'Toggle particle effect',
    action: () => [{ text: 'Particle effect toggled.', color: 'text-blue-400' }],
  },
  {
    name: 'glitch',
    description: 'Toggle glitch effect',
    action: () => [{ text: 'Glitch effect toggled.', color: 'text-purple-400' }],
  },
]