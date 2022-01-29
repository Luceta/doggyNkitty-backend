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
  SIGN_UP: {
    CHECK_CONTENT: "필수 입력사항을 입력해주세요.",
    CHECK_PASSWORD: "비밀번호는 6자 이상이어야 합니다.",
    CHECK_EMAIL: "잘못된 이메일 형식입니다.",
    CHECK_ACCOUNT_TEXT: "영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.",
  },
  LOGIN_IN: {
    CHECK_EMAIL: "이메일을 입력해주세요",
    CHECK_PASSWORD: "비밀번호를 입력해주세요.",
    CHECK_CONTENT: "이메일 또는 비밀번호를 입력해주세요.",
    CHECK_INPUT: "이메일 또는 비밀번호가 일치하지 않습니다.",
    INVALID_USER: "유저를 찾을 수 없습니다.",
  },

  TOKEN: {
    INVALID_TOKEN: "잘못된 토큰입니다.",
    EXPIRED_TOKEN: "만료된 토큰입니다.",
  },
};
