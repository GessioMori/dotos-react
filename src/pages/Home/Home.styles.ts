import DateTimePicker from 'react-datetime-picker'
import styled, { css } from 'styled-components'

export const CreateTodoContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 1rem;

  ${(props) => css`
    background-color: ${props.theme.dark800};
    color: ${props.theme.dark200};
  `}
`

export const CustomDateTimePicker = styled(DateTimePicker)`
  ${(props) => css`
    .react-datetime-picker__inputGroup__input:invalid {
      color: ${props.theme.red};
    }
    .react-datetime-picker__inputGroup__input {
      color: ${props.theme.white};
    }
    .react-datetime-picker__inputGroup {
      color: ${props.theme.white};
      padding: 0.5rem;
    }
    .react-datetime-picker__wrapper {
      border: none;
      height: 2.5rem;
      background-color: ${props.theme.dark700};
      border-radius: 8px;
      max-width: 14rem;
    }
    .react-datetime-picker {
      border-radius: 8px;
    }
    .react-datetime-picker__button__icon {
      stroke: ${props.theme.white} !important;
    }
    .react-datetime-picker__button__icon:hover {
      stroke: ${props.theme.purple700} !important;
    }
    .react-datetime-picker__inputGroup__input:invalid {
      background-color: ${props.theme.dark700} !important;
    }
  `}
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
  tr:last-child td {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
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
