export const baseResponse = {
  // COMMON SUCCESS
  // USER SUCCESS
  USER_PROFILE_LOOKUP_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'view User Profile Success' },
  USER_PROFILE_UPDATE_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'update User Profile Success' },
  USER_LOGIN_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'login-User Success' },
  CREATE_USER_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'create-User Success' },

  // NOTICE SUCCESS
  NOTICE_LOOKUP_SUCCESS: { isSuccess: true, statusCode: 200, statusMsg: 'notice look up Success' },

  // PROJECT SUCCESS
  PROJECT_REGISTER_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'project register Success' },
  PROJECT_LIKE_CHANGE_SUCCESS: { isSuccess: true, statusCode: 201, statusMsg: 'project Like Change Success' },

  // COMMON FAIL
  TOKEN_NOT_MATCH: { isSuccess: false, statusCode: 401, statusMsg: 'The token ID and user ID are not matched' },

  // USER FAIL
};
