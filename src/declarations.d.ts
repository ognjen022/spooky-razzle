// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.scss'

declare module '*.module.scss'
