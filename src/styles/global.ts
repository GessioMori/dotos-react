import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0E0E0E;
  color: #F9F9F9;
}
body, input{
  font-family: 'Roboto', sans-serif;
}
`
