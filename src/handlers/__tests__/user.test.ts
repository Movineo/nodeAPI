
import * as user from '../user';

describe ('user handler', () => {
    it('should create a user', async () => {
        const req = {
            body: {
                username: 'test',
                password: 'password'
            }
        };
        const res = {
            json: jest.fn()
        };
        const next = jest.fn();
        await user.createUser(req, res, next);
        expect(res.json).toHaveBeenCalled();
    });

    it('should sign in a user', async () => {
        const req = {
            body: {
                username: 'test',
                password: 'password'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn()
        };
        await user.signin(req, res);
        expect(res.json).toHaveBeenCalled();
    });
});
