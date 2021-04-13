/* import * as controllers from './index';
import * as service from '../service';
import * as httpMocks from 'node-mocks-http';
import { mockedDataUser } from '../test/mockedData';

jest.mock('../service');

const req = httpMocks.createRequest(mockedDataUser);
let res = httpMocks.createResponse();
const next = jest.fn();

describe('findUsers controllers', () => {
  it('should have a create findUsers funtion', () => {
    expect(typeof controllers.findUsers).toBe('function');
  });

  it('shoild call findUsers funtion', async () => {
    await controllers.findUsers(req, res, next);
    expect(service.findUsers).toBeCalled();
  });

  it('should return 200 reponse code and response', async () => {
    res = httpMocks.createResponse();
    (service.findUsers as jest.Mock).mockReturnValue([mockedDataUser.body]);
    await controllers.findUsers(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([mockedDataUser.body]);
  });

  it('should handle errors', async () => {
    const errorMessage = new Error('An error ocurred');
    const rejectPromise = Promise.reject(errorMessage);
    (service.findUsers as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.findUsers(req, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});

describe('userInformation controllers', () => {
  it('should have a create userInformation funtion', () => {
    expect(typeof controllers.userInformation).toBe('function');
  });

  it('should return 200 reponse code', async () => {
    await controllers.userInformation(mockedDataUser, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('should call userInformation funtion', async () => {
    await controllers.userInformation(mockedDataUser, res, next);
    expect(service.userInformation).toBeCalledWith(mockedDataUser.user);
  });

  it('should return json body response', async () => {
    res = httpMocks.createResponse();
    (service.userInformation as jest.Mock).mockReturnValue(mockedDataUser.body);

    const response: any = await controllers.userInformation(mockedDataUser, res, next);
    expect(response._getJSONData()).toStrictEqual(mockedDataUser.body);
  });

  it('should handle errors', async () => {
    res = httpMocks.createResponse();
    const rejectPromise = Promise.reject(new Error('An error ocurred'));
    (service.userInformation as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.userInformation(mockedDataUser, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});

describe('saveUsers controller', () => {
  it('should have a create user', () => {
    expect(typeof controllers.saveUsers).toBe('function');
  });

  it('shoild call saveUsers funtion', async () => {
    await controllers.saveUsers(req, res, next);
    expect(service.saveUsers).toBeCalledWith(mockedDataUser.body);
  });

  it('should return 201 reponse code', async () => {
    await controllers.saveUsers(req, res, next);
    expect(res.statusCode).toBe(201);
  });

  it('should return json body in response', async () => {
    res = httpMocks.createResponse();
    (service.saveUsers as jest.Mock).mockReturnValue(mockedDataUser.body);
    const response: any = await controllers.saveUsers(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(response._getJSONData()).toStrictEqual(mockedDataUser.body);
  });

  it('should handle errors', async () => {
    res = httpMocks.createResponse();
    const rejectPromise = Promise.reject(new Error('An error ocurred'));
    (service.saveUsers as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.saveUsers(req, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});

describe('updateUsers controllers', () => {
  it('should have a create updateUsers', () => {
    expect(typeof controllers.updateUsers).toBe('function');
  });

  it('shoild call updateUsers funtion', () => {
    const { body, params } = mockedDataUser;
    controllers.updateUsers(mockedDataUser, res, next);
    expect(service.updateUsers).toBeCalledWith(body, params);
  });

  it('should return 200 reponse code and response', async () => {
    (service.updateUsers as jest.Mock).mockReturnValue([mockedDataUser.body]);
    await controllers.updateUsers(mockedDataUser, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([mockedDataUser.body]);
    expect(res.statusCode).toBe(200);
  });

  it('should handle errors', async () => {
    const errorMessage = new Error('An error ocurred');
    const rejectPromise = Promise.reject(errorMessage);
    (service.updateUsers as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.updateUsers(mockedDataUser, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('removeUsers controllers', () => {
  it('should have a create removeUsers funtion', () => {
    expect(typeof controllers.removeUsers).toBe('function');
  });

  it('should return 200 reponse code', async () => {
    controllers.removeUsers(mockedDataUser, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('should call getRoleById funtion', () => {
    controllers.removeUsers(mockedDataUser, res, next);
    expect(service.removeUsers).toBeCalledWith(req.params);
  });

  it('should return json body in response', async () => {
    res = httpMocks.createResponse();
    (service.removeUsers as jest.Mock).mockReturnValue(mockedDataUser.params);
    const response: any = await controllers.removeUsers(mockedDataUser, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(response._getJSONData()).toStrictEqual(mockedDataUser.params);
  });

  it('should handle errors', async () => {
    const errorMessage = new Error('An error ocurred');
    const rejectPromise = Promise.reject(errorMessage);
    (service.removeUsers as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.removeUsers(mockedDataUser, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
 */
