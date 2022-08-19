import styled from 'styled-components'

export const CreateTodoForm = styled.form`
  width: 95%;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 1rem;
  row-gap: 1rem;

  background-color: ${(props) => props.theme.dark800};
  color: ${(props) => props.theme.dark200};
`

export const IconInputContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`

export const DueToButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media screen and (max-width: 620px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const DueToContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

export const ErrorsContainer = styled.div`
  p {
    font-size: 0.8rem;
    color: ${(props) => props.theme.red};
  }
`
export const ErrorButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  flex: 1;
  justify-content: flex-end;
  @media screen and (max-width: 620px) {
    flex-direction: row-reverse;
  }
`
