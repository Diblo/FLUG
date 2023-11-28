/**
 * Get the 'uid' parameter from the URL and parse it as an integer.
 *
 * @param {Object.<string, string>} params - The parameters object, typically obtained from useParams().
 * @returns {number|undefined} The parsed 'uid' as an integer or null if it's not a valid number.
 */
export function getUidParameter(params) {
  const uid = parseInt(params.uid, 10);
  if (!Number.isInteger(Number(params.uid)) || uid < 0) {
    return undefined;
  }

  return uid;
}
