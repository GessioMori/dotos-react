import styled from 'styled-components'

export const CreateTodoContainer = styled.div`
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
`

export const DueToContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;
`
