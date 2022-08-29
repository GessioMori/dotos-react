import dayjs from 'dayjs'
import { useContextSelector } from 'use-context-selector'
import { InputContainer } from '../../../components/Input.styles'
import { TodosContext } from '../../../contexts/TodoContext'
import { FilterContainer, FilterDateContainer } from './styles'

export function FilterTodos() {
  const { startDate, endDate, handleDateChange } = useContextSelector(
    TodosContext,
    (context) => {
      return {
        handleDateChange: context.handleDateChange,
        startDate: context.startDate,
        endDate: context.endDate,
      }
    },
  )
  return (
    <FilterContainer>
      <FilterDateContainer>
        <p>Start:</p>
        <InputContainer
          type="date"
          max={dayjs(endDate).format('YYYY-MM-DD')}
          value={startDate}
          onChange={(e) => handleDateChange(e.target.value, 'newStartDate')}
          maxWidth="10rem"
        />
      </FilterDateContainer>
      <FilterDateContainer>
        <p>End:</p>
        <InputContainer
          type="date"
          min={dayjs(startDate).format('YYYY-MM-DD')}
          value={endDate}
          onChange={(e) => handleDateChange(e.target.value, 'newEndDate')}
          maxWidth="10rem"
        />
      </FilterDateContainer>
    </FilterContainer>
  )
}
