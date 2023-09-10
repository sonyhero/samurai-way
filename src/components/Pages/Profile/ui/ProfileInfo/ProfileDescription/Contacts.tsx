import { getContacts } from '../../../../../../app/selectors/profile-selector'
import React from 'react'
import { useAppSelector } from '../../../../../../app/store'

export const Contacts = () => {
  const contacts = useAppSelector(getContacts)
  const mappedContacts = Object.entries(contacts).map((key, index) => {
    return (
      <div key={index}>
        {key[0]}: {key[1]}
      </div>
    )
  })
  return <div>{mappedContacts}</div>
}
