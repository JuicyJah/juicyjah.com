
export const ROUTES = {
  signup: "/auth/signup",
  login: "/auth/login",
  logout: "/auth/logout",
  projects: "/projects"
}

const TAGS = {
  // attributes
  simple: { text: "Simple Codebase", icon: "fa-solid fa-cube" },
  complex: { text: "Complex Codebase", icon: "fa-solid fa-cubes" },
  // services
  aws: { text: "AWS", icon: "fa-brands fa-aws" },
  stripe: { text: "Stripe", icon: "fa-brands fa-stripe" },
  cloudflare: { text: "Cloudflare", icon: "fa-brands fa-cloudflare" },
  // languages & frameworks
  markdown: { text: "Markdown", icon: "fa-brands fa-markdown" },
  js: { text: "JavaScript", icon: "fa-brands fa-js" },
  nodejs: { text: "NodeJS", icon: "fa-brands fa-node-js" },
  npm: { text: "npm", icon: "fa-brands fa-npm" },
  react: { text: "React", icon: "fa-brands fa-react" },
  svelte: { text: "Svelte", icon: "fa-solid fa-code" },
  html5: { text: "HTML5", icon: "fa-brands fa-html5" },
  css: { text: "CSS", icon: "fa-brands fa-css3-alt" },
  sass: { text: "SASS", icon: "fa-brands fa-sass" },
  python: { text: "Python", icon: "fa-brands fa-python" },
  phoenix: { text: "Elixir + Phoenix", icon: "fa-brands fa-phoenix-framework" }
}


export const PROJECTS = [
  {
    id: "juicyjah.com",
    name: "JuicyJah Website",
    description: "This website!",
    demo: "https://juicyjah.com",
    readme: "https://github.com/JuicyJah/juicyjah.com/blob/main/README.md",
    github: "https://github.com/JuicyJah/juicyjah.com",
    tags: [TAGS.simple, TAGS.svelte, TAGS.css]
  },
  {
    id: "pomodoro",
    name: 'Pomodoro',
    description: 'A Pomodoro PWA app built with Svelte.',
    demo: "https://pomodoro.juicyjah.com",
    readme: 'https://github.com/JuicyJah/pomodoro-app/blob/main/README.md',
    github: 'https://github.com/JuicyJah/pomodoro-app',
    tags: [TAGS.simple, TAGS.svelte, TAGS.css]
  },
  {
    id: "svelte-inputs",
    name: 'Svelte-Inputs',
    description: 'An npm package for a dynamic form input elements, made with svelte.',
    demo: "https://www.npmjs.com/package/svelte-inputs",
    readme: 'https://github.com/JuicyJah/svelte-inputs/blob/master/README.md',
    github: 'https://github.com/JuicyJah/svelte-inputs',
    tags: [TAGS.simple, TAGS.svelte, TAGS.npm]
  },
  {
    id: "juicy-weather",
    name: "Juicy Weather",
    description: "The Juiciest weather app! An API based weather UI.",
    demo: "https://weather.juicyjah.com",
    readme: "https://github.com/JuicyJah/juicy-weather/blob/main/README.md",
    github: "https://github.com/JuicyJah/juicy-weather",
    tags: [TAGS.simple, TAGS.svelte, TAGS.css]
  }
]
