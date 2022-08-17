import styled, { css } from 'styled-components'

interface TodoStatusProps {
  variant: 'red' | 'green' | 'yellow'
}

export const TodoStatus = styled.span<TodoStatusProps>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: left !important;
  text-align: left !important;

  ${(props) => css`
    background-color: ${props.theme[props.variant]};
  `}
`
export const TodoButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
interface TodoActionButtonProps {
  variant: 'red' | 'green' | 'yellow'
}

export const TodoActionButton = styled.button<TodoActionButtonProps>`
  border: none;
  margin: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  border-radius: 4px;
  height: 2rem;
  width: 2rem;

  :hover {
    filter: brightness(1.2);
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
  &:first-child {
    margin-left: 0;
  }

  ${(props) => css`
    background-color: ${props.theme[props.variant]};
    :focus {
      outline: ${props.theme[props.variant]} solid 2px;
      outline-offset: 2px;
    }
  `}
`

export const TodoDetails = styled.td`
  cursor: default !important;
  ${(props) => css`
    background-color: ${props.theme.dark600};
  `}
`
