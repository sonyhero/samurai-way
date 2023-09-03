import * as Form from '@radix-ui/react-form'
import { TextField } from '../../../ui/textfield'
import { Button } from '../../../ui/button'
import s from './UserSearchForm.module.scss'
import { FC, FormEvent } from 'react'

type PropsType = {
  submit: (event: FormEvent<HTMLFormElement>) => void
}

export const UserSearchForm: FC<PropsType> = ({ submit }) => {
  return (
    <Form.Root onSubmit={submit}>
      <div className={s.userField}>
        <Form.Field name={'term'}>
          <Form.Label>User</Form.Label>
          <Form.Control asChild>
            <TextField placeholder={'type to find user...'} />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button className={s.submit}>Find user</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  )
}
