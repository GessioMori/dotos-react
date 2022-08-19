import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock, NotePencil } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { ButtonContainer } from '../../../components/Button.styles'
import { InputContainer } from '../../../components/Input.styles'
import {
  CreateTodoContainer,
  DueToButtonContainer,
  DueToContainer,
  IconInputContainer,
} from './styles'

const validationSchema = zod
  .object({
    content: zod.string().min(10, 'Content must have at least 10 characters'),
    dueToDate: zod.string(),
    dueToHour: zod.string(),
  })
  .refine(({ dueToDate, dueToHour }) => !(!dueToDate && dueToHour), {
    message: 'You can not provide an hour without a date.',
    path: ['dueToDate'],
  })

type createTodoInput = zod.infer<typeof validationSchema>

export function CreateTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createTodoInput>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<createTodoInput> = ({
    content,
    dueToDate,
    dueToHour,
  }) => {
    if (!dueToDate && !dueToHour) {
      console.log({
        content,
      })
    } else if (dueToDate && !dueToHour) {
      console.log({
        content,
        due_to: dayjs(dueToDate + '23:59:59').toISOString(),
      })
    } else {
      console.log({
        content,
        due_to: dayjs(dueToDate + dueToHour).toISOString(),
      })
    }
  }

  return (
    <CreateTodoContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <IconInputContainer>
          <NotePencil size={24} weight="bold" />
          <InputContainer
            type="text"
            placeholder="Type your new todo here."
            {...register('content')}
          />
          <p>{errors.content?.message}</p>
        </IconInputContainer>
        <DueToButtonContainer>
          <DueToContainer>
            <IconInputContainer>
              <Calendar size={24} weight="bold" />
              <InputContainer
                min={dayjs().format('YYYY-MM-DD')}
                type="date"
                maxWidth="10rem"
                {...register('dueToDate')}
              />
            </IconInputContainer>
            <IconInputContainer>
              <Clock size={24} weight="bold" />
              <InputContainer
                type="time"
                maxWidth="8rem"
                {...register('dueToHour')}
              />
            </IconInputContainer>
            <p>{errors.dueToDate?.message}</p>
          </DueToContainer>
          <ButtonContainer maxWidth="5rem" type="submit">
            Send
          </ButtonContainer>
        </DueToButtonContainer>
      </form>
    </CreateTodoContainer>
  )
}
