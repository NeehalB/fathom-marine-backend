export const jwtPayload = (token: string) => {
  const parts = token.split(".");
  const payload = atob(parts[1]);
  const payloadData = JSON.parse(payload);
  return payloadData;
};
