import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { TextField } from '../../../../ui/textfield'
import { Typography } from '../../../../ui/typography'

type ProfileStatusType = {
  status: string
  updateProfileStatus: (status: string) => void
}

export const ProfileStatusUseState: React.FC<ProfileStatusType> = (props) => {
  const { status, updateProfileStatus } = props

  const [editMode, setEditMode] = useState<boolean>(false)
  const [statusProfile, setStatusProfile] = useState<string>(status)

  useEffect(() => {
    setStatusProfile(status)
  }, [status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deActivateEditMode = () => {
    setEditMode(false)
    updateProfileStatus(statusProfile)
  }

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => setStatusProfile(e.currentTarget.value)

  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      deActivateEditMode()
    }
  }

  return (
    <>
      {editMode ? (
        <div>
          <TextField
            autoFocus
            onBlur={deActivateEditMode}
            value={statusProfile}
            onChange={onChangeStatus}
            onKeyDown={onKeyHandler}
          />
        </div>
      ) : (
        <div>
          <Typography onDoubleClick={activateEditMode}>{status || 'No status'}</Typography>
        </div>
      )}
    </>
  )
}
