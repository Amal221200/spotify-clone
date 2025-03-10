import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle<{ color: string }>`
  body {
    background: linear-gradient(135deg, ${props => props.color} 10%, rgb(0, 0, 0) 90%);
    transition: background 1s ease;
  }
`

export default GlobalStyles;