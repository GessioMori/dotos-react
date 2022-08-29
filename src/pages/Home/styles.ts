import styled, { css } from 'styled-components'

export const TodosContainer = styled.div`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;

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
        background-color: ${props.theme.blue};
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
