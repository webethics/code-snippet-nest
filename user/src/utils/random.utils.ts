function randomString(len = 6) {
  let id = '',
    i = 0;
  const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
        '',
      ),
    l = chars.length;

  for (; i < len; i++) id += chars[Math.floor(Math.random() * l)];

  return id;
}

export function generate() {
  return randomString();
}
