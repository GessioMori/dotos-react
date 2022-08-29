import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock, NotePencil } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as zod from 'zod'
import { ButtonContainer } from '../../../components/Button.styles'
import { InputContainer } from '../../../components/Input.styles'
import { TodosContext } from '../../../contexts/TodoContext'
import { api } from '../../../libs/axios'
import {
  CreateTodoForm,
  DueToButtonContainer,
  DueToContainer,
  ErrorButtonContainer,
  ErrorsContainer,
  IconInputContainer,
} from './styles'

const validationSchema = zod
  .object({
    content: zod.string().min(10, 'Content must have at least 10 characters'),
    dueToDate: zod.string(),
    dueToHour: zod.string(),
  })
  .refine(({ dueToDate, dueToHour }) => !(!dueToDate && dueToHour), {
    message: 'You can not provide an hour without a date',
    path: ['dueToDate'],
  })

type createTodoInput = zod.infer<typeof validationSchema>

interface CreateTodoDTO {
  content: string
  due_to?: string
}

export function CreateTodo() {
  const handleTodoCreation = useContextSelector(
    TodosContext,
    (context) => context.handleTodoCreation,
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createTodoInput>({
    resolver: zodResolver(validationSchema),
  })

  async function handleRequest(data: CreateTodoDTO) {
    api.post('/todos', data).then((data) => handleTodoCreation(data.data))
    reset()
  }

  const onSubmit: SubmitHandler<createTodoInput> = ({
    content,
    dueToDate,
    dueToHour,
  }) => {
    if (!dueToDate && !dueToHour) {
      handleRequest({ content })
    } else if (dueToDate && !dueToHour) {
      handleRequest({
        content,
        due_to: dayjs(dueToDate + '23:59:59').toISOString(),
      })
    } else {
      handleRequest({
        content,
        due_to: dayjs(dueToDate + dueToHour).toISOString(),
      })
    }
  }

  return (
    <CreateTodoForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <IconInputContainer>
        <NotePencil size={24} weight="bold" />
        <InputContainer
          type="text"
          placeholder="Type your new todo here."
          {...register('content')}
        />
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
        </DueToContainer>
        <ErrorButtonContainer>
          {(errors.content?.message || errors.dueToDate?.message) && (
            <ErrorsContainer>
              {errors.content?.message && <p>{errors.content?.message}</p>}
              {errors.dueToDate?.message && <p>{errors.dueToDate?.message}</p>}
            </ErrorsContainer>
          )}
          <ButtonContainer maxWidth="5rem" type="submit">
            Send
          </ButtonContainer>
        </ErrorButtonContainer>
      </DueToButtonContainer>
    </CreateTodoForm>
  )
}
