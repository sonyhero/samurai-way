import { authAPI } from '../../../../api/auth-api'
import { ResponseAppType, ResultCodesEnum } from '../../../../api/api'
import { login } from '../auth-reducer'

jest.mock('../../../api/auth-api')

const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
const result: ResponseAppType<{ userId: number }> = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  fieldsErrors: {
    error: '',
    field: '',
  },
  data: {
    userId: 1,
  },
}

test('login success', async () => {
  authAPIMock.logIn.mockReturnValue(Promise.resolve(result))
  const thunk = login('test@gmail.com', 'qwerty123', true, 'string')
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
})
