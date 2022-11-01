export const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
export const PW_REGEX =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[@!%*#?&])[A-Za-zd@!%*#?&]{8,}$/; // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
