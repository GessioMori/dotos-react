import styled from 'styled-components'

export const BaseContainer = styled.div`
  width: 95%;
  max-width: 40rem;

  display: flex;
  flex-direction: column;

  padding: 2rem 1rem;
  margin: auto;
  border-radius: 8px;

  background-color: ${(props) => props.theme.dark800};

  & > p {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    p {
      font-size: 0.8rem;
      color: ${(props) => props.theme.red};
      text-align: right;
      margin-top: 0.4rem;
    }

    input ~ label {
      margin-top: 1rem;
    }
  }
`
