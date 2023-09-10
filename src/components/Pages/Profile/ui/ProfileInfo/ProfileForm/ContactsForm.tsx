import { useSelector } from 'react-redux'
import { getContacts } from '../../../../../../app/model/selectors/profile-selector'
import { fieldCreator, Input } from '../../../../../forms-controls/FormsControl'
import React from 'react'

export const ContactsForm = () => {
  const contacts = useSelector(getContacts)
  const mappedContacts = Object.keys(contacts).map((key, index) => {
    return (
      <div key={index}>
        {key}: {fieldCreator(`contacts.${key}`, `enter valid ${key} adress`, [], Input)}
      </div>
    )
  })
  return <div>{mappedContacts}</div>
}
