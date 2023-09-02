import { followUsers, unFollowUsers, userActions } from './users-reducer'
import { ResponseAppType, ResultCodesEnum } from '../../../../api/api'
import { usersAPI } from '../../../../api/users-api'

jest.mock('../../../api/users-api')

const { follow, toggleFollowingProgress, unFollow } = userActions
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseAppType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  fieldsErrors: {
    error: '',
    field: '',
  },
  data: {},
}

test('follow success', async () => {
  userAPIMock.followUsers.mockReturnValue(Promise.resolve(result))
  const thunk = followUsers(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})
test('unFollow success', async () => {
  userAPIMock.unFollowUsers.mockReturnValue(Promise.resolve(result))
  const thunk = unFollowUsers(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})
