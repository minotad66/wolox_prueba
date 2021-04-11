import * as controllers from './index';
import * as service from '../service';
import * as httpMocks from 'node-mocks-http';
import { mockedDataUser } from '../test/mockedData';

jest.mock('../service');

const req = httpMocks.createRequest(mockedDataUser);
let res = httpMocks.createResponse();
const next = jest.fn();

describe('signIn controller', () => {
  it('should have a create sign-in', () => {
    expect(typeof controllers.signIn).toBe('function');
  });

  it('shoild call signIn funtion', async () => {
    await controllers.signIn(req, res, next);
    expect(service.signIn).toBeCalledWith(mockedDataUser.body);
  });

  it('should return 200 reponse code', async () => {
    await controllers.signIn(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('should return json body in response', async () => {
    (service.signIn as jest.Mock).mockReturnValue(mockedDataUser.body);
    const response: any = await controllers.signIn(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(response._getJSONData()).toStrictEqual(mockedDataUser.body);
  });

  it('should handle errors', async () => {
    const rejectPromise = Promise.reject(new Error('An error ocurred'));
    (service.signIn as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.signIn(req, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});
