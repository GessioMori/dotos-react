import styled, { css } from 'styled-components'

export const CreateTodoContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 1rem;
  row-gap: 1rem;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};
  `}
`

export const FilterAndSortContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 1rem;
  row-gap: 1rem;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};
  `}
`
interface CheckboxProps {
  checked: boolean
}
export const Checkbox = styled.div<CheckboxProps>`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  outline-offset: 2px;
  ${(props) => css`
    outline: 2px solid ${props.theme.purple700};
    background-color: ${props.checked
      ? props.theme.purple700
      : props.theme.dark800};
  `}
`

export const DueToButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

export const DueToContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;
`

export const TodosContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};

    td {
      border-top: 1px solid ${props.theme.dark600};
      border-bottom: 1px solid ${props.theme.dark600};
    }
    ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      justify-content: end;
      padding: 1rem;

      li {
        height: 2rem;
        background-color: ${props.theme.dark900};
        cursor: pointer;
        width: 2rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props.theme.white};
      }

      li a {
        padding: 0.2rem 0.2rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      }

      li.active a {
        background-color: ${props.theme.purple800};
      }
      li.disabled a {
        background-color: ${props.theme.dark700};
      }
      li.disable,
      li.disabled a {
        cursor: default;
      }
    }
  `}
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    padding: 1rem;
    width: 20%;
  }
  td {
    padding: 0.8rem 0.8rem;
  }
  td:nth-child(-n + 2) {
    cursor: pointer;
  }
  td:nth-child(2) {
    width: 90%;
    text-align: left;
    padding: 0.8rem 0.3rem;
  }
  tr:first-child td {
    border-top: none;
  }
  table:last-child td {
    border-bottom: none;
  }
`

export const TodoDetails = styled.td`
  cursor: default !important;
  ${(props) => css`
    background-color: ${props.theme.dark600};
  `}
`

interface TodoActionButtonProps {
  variant: 'red' | 'blue'
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
  `}
`

export const TodoButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

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
