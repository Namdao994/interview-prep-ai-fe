export const getCookie = (name: string): string | undefined => {
  const cookie = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));

  if (!cookie) return undefined;

  return cookie.split('=').slice(1).join('=');
};
