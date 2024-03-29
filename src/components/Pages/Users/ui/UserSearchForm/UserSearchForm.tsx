import s from './UserSearchForm.module.scss'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getUsersFilter } from '../../../../../app/model/selectors/users-selector'
import { SearchFilterType } from '../../model/users-reducer'
import { Field, Formik } from 'formik'
import { TextField } from '../../../../ui/textfield'
import { Button } from '../../../../ui/button'

const options = [
  { value: 'null', item: 'all' },
  { value: 'true', item: 'only followed' },
  { value: 'false', item: 'only unfollowed' },
]

export const UserSearchForm: FC<PropsType> = memo(({ onFilterChange }) => {
  const filter = useSelector(getUsersFilter)
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: SearchFilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true',
    }
    onFilterChange(filter)
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      onSubmit={submit}
    >
      {({ values, handleSubmit, isSubmitting, handleChange }) => (
        <form onSubmit={handleSubmit} className={s.userField}>
          <TextField
            className={s.input}
            name={'term'}
            onChange={handleChange}
            value={values.term}
            placeholder={'type to search...'}
          />
          <div className={s.selectAndSearch}>
            <Field as="select" name="friend" className={s.select}>
              {options.map((el) => (
                <option key={el.value} value={el.value} className={s.content}>
                  {el.item}
                </option>
              ))}
            </Field>
            <Button type={'submit'} disabled={isSubmitting}>
              search
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
})

//Types
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
  term: string
  friend: FriendFormType
}
type PropsType = {
  onFilterChange: (filter: SearchFilterType) => void
}
