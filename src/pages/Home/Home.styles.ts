import styled, { css } from 'styled-components'

export const TodosContainer = styled.div`
  width: 95%;

  background-color: red;

  margin: auto;

  max-width: 80rem;

  overflow-x: auto;

  display: flex;
  flex-direction: column;

  padding: 1rem 1rem;

  border-radius: 8px;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};
  `}
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    padding: 1rem;
    width: 20%;
  }
  th:first-child {
    width: 70%;
  }
  tbody {
    width: 100%;
  }
  tbody tr {
    cursor: pointer;
  }
  td {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  td:nth-last-child(-n + 5) {
    border-bottom: none;
  }
`

interface TodoActionButtonProps {
  variant: 'red' | 'green'
}

export const TodoActionButton = styled.button<TodoActionButtonProps>`
  border: none;
  margin: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  border-radius: 2px;
  height: 2rem;
  width: 2rem;

  :hover {
    filter: brightness(1.2);
  }

  ${(props) => css`
    background-color: ${props.theme[props.variant]};
  `}
`

export const TodoButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
