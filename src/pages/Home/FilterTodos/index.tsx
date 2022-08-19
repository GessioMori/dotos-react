import dayjs from 'dayjs'
import { InputContainer } from '../../../components/Input.styles'
import { FilterContainer, FilterDateContainer } from './styles'

interface FilterTodosProps {
  handleDateChange: (value: string, type: 'newStartDate' | 'newEndDate') => void
  endDate: string
  startDate: string
}

export function FilterTodos({
  handleDateChange,
  endDate,
  startDate,
}: FilterTodosProps) {
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
