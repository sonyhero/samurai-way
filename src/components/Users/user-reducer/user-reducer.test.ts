import {InitialUsersReducerStateType, userActions, usersReducer} from "./users-reducer";

const { follow, unFollow } = userActions

let state: InitialUsersReducerStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Anton 0',
                followed: false,
                photos: {small: '', large: ''},
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 0'
            },
            {
                id: 1,
                name: 'Anton 1',
                followed: false,
                photos: {small: '', large: ''},
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 1'
            },
            {
                id: 2,
                name: 'Anton 2',
                followed: true,
                photos: {small: '', large: ''},
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 2'
            },
            {
                id: 3,
                name: 'Anton 3',
                followed: true,
                photos: {small: '', large: ''},
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 3'
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {

    const newState = usersReducer(state, follow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unFollow success', () => {

    const newState = usersReducer(state, unFollow(2))

    expect(newState.users[3].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
})