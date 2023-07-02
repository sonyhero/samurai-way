import {ProfileStatus} from './ProfileStatus';
import {create, ReactTestInstance} from 'react-test-renderer';

describe('Profile status component', () => {

    test('status from props should be in state', () => {
        const component = create(<ProfileStatus status={'New status'} updateProfileStatus={() => {
        }}/>)
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('New status')
    })

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status={'New Status'} updateProfileStatus={() => {
        }}/>);
        const root = component.root
        const span = root.findByType('span')
        expect(span).not.toBe(null)
    })
    test('after creation <input> shouldn\'t be displayed', () => {
        const component = create(<ProfileStatus status={'New Status'} updateProfileStatus={() => {
        }}/>);
        const root = component.root
        expect(() => root.findByType('input')).toThrow()
    })
    test('after creation <span>should contains correct status', () => {
        const component = create(<ProfileStatus status={'New Status'} updateProfileStatus={() => {
        }}/>);
        const root = component.root
        const span = root.findByType('span')
        expect(span.children[0]).toBe('New Status')
    })
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status={'New Status'} updateProfileStatus={() => {
        }}/>);
        const root = component.root
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('New Status')
    })
    test('callback should be called', () => {
        const fakeCallback = jest.fn()
        const component = create(<ProfileStatus status={'New Status'} updateProfileStatus={fakeCallback}/>);
        const instance = component.getInstance() as ProfileStatusInstance
        instance?.deActivateEditMode()
        expect(fakeCallback.mock.calls.length).toBe(1)
    })
})
type ProfileStatusInstance = ReactTestInstance & {
    deActivateEditMode: () => void;
}