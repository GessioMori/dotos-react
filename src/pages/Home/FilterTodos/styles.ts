import styled, { css } from 'styled-components'

export const FilterContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 1rem;
  row-gap: 1rem;
  column-gap: 2rem;
  flex-wrap: wrap;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};
  `}
`

export const FilterDateContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  min-width: 30%;
`
