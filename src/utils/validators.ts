const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): { valid: boolean; message: string } {
  if (!email || email.trim() === '') {
    return { valid: false, message: '请输入邮箱地址' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: '请输入有效的邮箱地址' };
  }
  return { valid: true, message: '' };
}

export function validatePassword(password: string): { valid: boolean; message: string } {
  if (!password) {
    return { valid: false, message: '请输入密码' };
  }
  if (password.length < 6) {
    return { valid: false, message: '密码至少需要6个字符' };
  }
  return { valid: true, message: '' };
}

export function validateNickname(nickname: string): { valid: boolean; message: string } {
  if (!nickname || nickname.trim() === '') {
    return { valid: false, message: '请输入昵称' };
  }
  const trimmed = nickname.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: '昵称至少需要2个字符' };
  }
  if (trimmed.length > 20) {
    return { valid: false, message: '昵称不能超过20个字符' };
  }
  return { valid: true, message: '' };
}
