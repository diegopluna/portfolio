type Command = {
  name: string
  description: string
  action: () => string[]
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'List all available commands',
    action: () => [
      'Available commands:',
      'about    - Display information about me',
      'skills   - List my technical skills',
      'projects - Show my project portfolio',
      'contact  - Display my contact information',
      'clear    - Clear the terminal screen',
      'theme    - Toggle light/dark mode',
    ]
  },
  {
    name: 'about',
    description: 'Display information about me',
    action: () => [
      'Diego Peter',
      'Software Engineer',
      'Passionate about learning and developing new things.',
      'I am currently working as a Software Developer Intern at Pitang.',
    ]
  },
  {
    name: 'skills',
    description: 'List my technical skills',
    action: () => [
      'Technical Skills:',
      '- JavaScript / TypeScript',
      '- React / Next.js',
      '- Node.js / Express / Nest.js',
      '- Python / Flask / Django',
      '- Golang',
      '- Java / Spring Boot',
    ]
  },
  {
    name: 'projects',
    description: 'Show my project portfolio',
    action: () => [
      'Project Portfolio:',
      '1. Vitaes',
      '   A web application that allow users to build their own resume. Built with Next.js.',
      '   GitHub: https://github.com/diegopluna/vitaes',
      '   URL: https://vitaes.io',
      '2. Portfolio Website',
      '   Personal portfolio website built with React and Vite.',
      '   GitHub: https://github.com/diegopluna/portfolio',
      '   URL: https://dpeter.dev',
    ]
  },
  {
    name: 'contact',
    description: 'Display my contact information',
    action: () => [
      'Contact Information:',
      'Email: diegopeter@dpeter.dev',
      'GitHub: github.com/diegopluna',
      'LinkedIn: linkedin.com/in/diegopeter',
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
    action: () => ['Theme toggled. The change will be applied immediately.']
  }
]