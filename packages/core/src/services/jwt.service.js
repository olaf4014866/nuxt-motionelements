import cookies from 'js-cookie';

export function getJwt() {
  return cookies.get('ME_jwt');
}

// not signature for Vue
function decodeJwt(token) {
  if (!token) {
    return null;
  }
  const parts = token.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  // const signature = atob(parts[2].replace(/_/g, '/').replace(/-/g, '+'));

  return {
    header: header,
    payload: payload,
    // signature: signature,
    // raw: { header: parts[0], payload: parts[1], signature: parts[2] },
  };
}

// not signature for Vue
export function getJwtPayload() {
  try {
    const result = decodeJwt(getJwt());
    return result ? result.payload : {};
  } catch (error) {
    return {};
  }
}
