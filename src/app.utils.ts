import * as bcrypt from 'bcrypt';
import * as NodeGeocoder from 'node-geocoder';

// utils: 정규표현식, 에러메시지 등을 다루는 파일.
const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const PHONE_NUMBER_RULE = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
const PASSWORD_RULE_MESSAGE = 'Password should have 1 number, 1 word.';
const PHONE_NUMBER_MESSAGE = 'PhoneNumber format is xxx-xxxx-xxxx';
const PASSWORD_COMPARE = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

const SUCCESS = ({ isSuccess, statusCode, statusMsg }, data) => {
  return {
    isSuccess: isSuccess,
    statusCode: statusCode,
    statusMsg: statusMsg,
    data,
  };
};

const ERROR = ({ isSuccess, statusCode, statusMsg }) => {
  return {
    isSuccess: isSuccess,
    statusCode: statusCode,
    statusMsg: statusMsg,
  };
};

export const response_format = {
  SUCCESS,
  ERROR,
};

export const REGEX = {
  PASSWORD_RULE,
  PHONE_NUMBER_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
  PHONE_NUMBER_MESSAGE,
};

export const CHECK = {
  PASSWORD_COMPARE,
};

export const findLatLong = async (locationName) => {
  const options = {
    provider: 'openstreetmap',
  };
  const geocoder = NodeGeocoder(options);
  const [regionLatLong] = await geocoder.geocode(locationName);
  return regionLatLong;
};