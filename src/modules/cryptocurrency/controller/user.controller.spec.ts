import * as controllers from './index';
import * as service from '../service';
import * as httpMocks from 'node-mocks-http';
import { mockedDataUser } from '../test/mockedData';

jest.mock('../service');

const req = httpMocks.createRequest(mockedDataUser);
let res = httpMocks.createResponse();
const next = jest.fn();

describe('findListCryptocurrency controllers', () => {
  it('should have a create findListCryptocurrency funtion', () => {
    expect(typeof controllers.findListCryptocurrency).toBe('function');
  });

  it('shoild call findListCryptocurrency funtion', async () => {
    await controllers.findListCryptocurrency(mockedDataUser, res, next);
    expect(service.findListCryptocurrency).toBeCalled();
  });

  it('should return 200 reponse code and response', async () => {
    res = httpMocks.createResponse();
    (service.findListCryptocurrency as jest.Mock).mockReturnValue([mockedDataUser.body]);
    await controllers.findListCryptocurrency(mockedDataUser, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([mockedDataUser.body]);
  });

  it('should handle errors', async () => {
    const errorMessage = new Error('An error ocurred');
    const rejectPromise = Promise.reject(errorMessage);
    (service.findListCryptocurrency as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.findListCryptocurrency(mockedDataUser, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});

describe('cryptocurrencyUser controllers', () => {
  it('should have a create cryptocurrencyUser funtion', () => {
    expect(typeof controllers.cryptocurrencyUser).toBe('function');
  });

  it('shoild call cryptocurrencyUser funtion', async () => {
    await controllers.cryptocurrencyUser(mockedDataUser, res, next);
    expect(service.cryptocurrencyUser).toBeCalled();
  });

  it('should return 200 reponse code and response', async () => {
    res = httpMocks.createResponse();
    (service.cryptocurrencyUser as jest.Mock).mockReturnValue([mockedDataUser.body]);
    await controllers.cryptocurrencyUser(mockedDataUser, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([mockedDataUser.body]);
  });

  it('should handle errors', async () => {
    const errorMessage = new Error('An error ocurred');
    const rejectPromise = Promise.reject(errorMessage);
    (service.cryptocurrencyUser as jest.Mock).mockReturnValue(rejectPromise);
    await controllers.cryptocurrencyUser(mockedDataUser, res, next);
    expect(next).toBeCalledWith(new Error('An error ocurred'));
  });
});
