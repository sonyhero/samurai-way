export {}
// import {follow, followUsers, toggleFollowingProgress} from './users-reducer';
// import {ResponseType, usersAPI} from '../../api/api';
// import {ResultCodesEnum} from './enums';
//
// jest.mock('../../api/api');
//
// const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
//
// const result: ResponseType = {
//     resultCode:ResultCodesEnum.Success,
//     messages: [],
//     fieldsErrors: [],
//     data: {}
// }
//
// userAPIMock.followUsers.mockReturnValue(Promise.resolve(result))
//
// test('', async () => {
//
//     const thunk = followUsers(1)
//     const dispatchMock = jest.fn()
//     const getStateMock = jest.fn()
//
//     // @ts-ignore
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
// })