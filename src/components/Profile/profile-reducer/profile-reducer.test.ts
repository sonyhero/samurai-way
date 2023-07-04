import {
    addPost, deletePost,
    InitialProfileReducerStateType,
    profileReducer, ProfileType,
    setUserProfile,
    setUserProfileStatus
} from './profile-reducer';

describe('profileReducer', () => {
    let initialState: InitialProfileReducerStateType;

    beforeEach(() => {
        initialState = {
            posts: [
                {id: 1, postText: 'Hi, how are you?', likesCount: 23},
                {id: 2, postText: 'It\'s my first post!', likesCount: 100},
            ],
            profile: {
                aboutMe: '',
                contacts: {
                    facebook: '',
                    website: '',
                    vk: '',
                    twitter: '',
                    instagram: '',
                    youtube: '',
                    github: '',
                    mainLink: '',
                },
                lookingForAJob: true,
                lookingForAJobDescription: '',
                fullName: '',
                userId: 28769,
                photos: {
                    small: '',
                    large: '',
                }
            },
            profileStatus: ''
        }
    });

    it('should add new post to state', () => {
        const newPostText = 'Hello world!';
        const action = addPost(newPostText);
        const newState = profileReducer(initialState, action);

        expect(newState.posts.length).toBe(3);
        expect(newState.posts[2].postText).toBe(newPostText);
        expect(newState.posts[2].likesCount).toBe(0);
    });

    it('should delete post from state', () => {
        const action = deletePost(1);
        const newState = profileReducer(initialState, action);

        expect(newState.posts.length).toBe(1);
    });

    it('should not delete post from state if id is incorrect', () => {
        const action = deletePost(1000000);
        const newState = profileReducer(initialState, action);

        expect(newState.posts.length).toBe(2);
    });

    it('should set user profile to state', () => {
        const profile: ProfileType = {
            userId: 1,
            fullName: 'John',
            aboutMe: '',
            photos: {small: '', large: ''},
            lookingForAJob: false,
            lookingForAJobDescription: ''
        };
        const action = setUserProfile(profile);
        const newState = profileReducer(initialState, action);

        expect(newState.profile).toEqual(profile);
    });

    it('should set user profile status to state', () => {
        const status = 'online';
        const action = setUserProfileStatus(status);
        const newState = profileReducer(initialState, action);

        expect(newState.profileStatus).toBe(status);
    });
});