// utils: 정규표현식, 에러메시지 등을 다루는 파일.
const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const PASSWORD_RULE_MESSAGE = 'Password should have 1 number, 1 word.'

export const REGEX = {
    PASSWORD_RULE,
}

export const MESSAGES = {
    PASSWORD_RULE_MESSAGE
}
