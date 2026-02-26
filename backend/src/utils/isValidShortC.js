export function isValidShortCode(code) {
    const isValid = /^[a-zA-Z0-9]{1,8}$/.test(code);
    return isValid;

}