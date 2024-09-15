export const emailRules = [
  {required: true, message: '请输入您的邮箱'},
  {validator: mailValidator},
];

export function mailValidator(_: any, value: string) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!reg.test(value)) {
    return Promise.reject('请输入格式正确的邮箱');
  }

  return Promise.resolve();
}
