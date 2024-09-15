export function mailValidator(value: string) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!reg.test(value)) {
    return false;
  }

  return true;
}
