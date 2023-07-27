import {ResponseType, ResultCodesEnum} from '../../../api/api';
import {profileAPI} from '../../../api/profile-api';
import {getProfileData, getProfileStatus, PhotosType} from "./profile-reducer";

jest.mock('../../../api/profile-api');

const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>
const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}
test('get profile success', async () => {

    profileAPIMock.getStatus.mockReturnValue(Promise.resolve(result))
    const thunk = getProfileData('1')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})
test('get profile status success', async () => {

    profileAPIMock.getStatus.mockReturnValue(Promise.resolve(result))
    const thunk = getProfileStatus('1')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})
test('save profile photo success', async () => {
    const result: ResponseType<{ photos: PhotosType }> = {
        resultCode: ResultCodesEnum.Success,
        messages: [],
        fieldsErrors: [],
        data: {
            photos: {
                small: '',
                large: ''
            }
        }
    }

    profileAPIMock.updatePhoto.mockReturnValue(Promise.resolve(result))
    const thunk = getProfileStatus('1')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})