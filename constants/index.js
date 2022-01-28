export const STATUS_CODES = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGE = {
  CHECK_CONTENT: "필수 입력사항을 입력해주세요.",
  CHECK_PASSWORD: "비밀번호는 6자 이상이어야 합니다.",
  CHECK_EMAIL: "잘못된 이메일 형식입니다.",
  EXIST_USER: "이미 가입된 이메일 주소입니다.",
  EXIST_ACCOUNT: "이미 사용중인 계정 ID입니다.",
  CHECK_ACCOUNT_TEXT: "영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.",
};
