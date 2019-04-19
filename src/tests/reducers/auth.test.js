import authReducer from '../../reducers/auth';
import { login, logout } from '../../actions/auth';

test('Should run login action and return uid', () => {
    const action = login('35');
    const store = {}
    const state = authReducer(store, action);
    expect(state).toEqual({uid: '35'});
})

test('Should run logout action and return empty state', () => {
    const action = logout();
    const store = {}
    const state = authReducer(store, action);
    expect(state).toEqual({});
})