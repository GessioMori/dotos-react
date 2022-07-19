import styled, { css } from 'styled-components'

export const LabelContainer = styled.label`
  margin-top: 1rem;
  margin-left: 0.5rem;
  &:first-of-type {
    margin-top: 0;
  }
  ${(props) => css`
    color: ${props.theme.dark200};
  `}
`
