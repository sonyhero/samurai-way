import {followUsers, unFollowUsers, userActions} from './users-reducer';
import {ResponseType, ResultCodesEnum} from '../../api/api';
import {usersAPI} from '../../api/users-api';

jest.mock('../../api/api');

const {follow, toggleFollowingProgress, unFollow} = userActions
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}

test('follow success', async () => {

    userAPIMock.followUsers.mockReturnValue(Promise.resolve(result))
    const thunk = followUsers(1)
    const dispatchMock = jest.fn()
    // const getStateMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})
test('unFollow success', async () => {

    userAPIMock.unFollowUsers.mockReturnValue(Promise.resolve(result))
    const thunk = unFollowUsers(1)
    const dispatchMock = jest.fn()
    // const getStateMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})