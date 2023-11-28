import config from "../config";

/**
 * Perform an HTTP request to the specified URL with the given method and data.
 *
 * @param {string} uri - The URL to make the request to.
 * @param {(response: object) => void} callBack
 * @param {('GET'|'POST'|'PATCH'|'DELETE')} [method] - The HTTP method (GET, POST, PATCH, DELETE).
 * @param {object} [data] - The data to include in the request body for POST and PATCH.
 * @returns {AbortSignal} A promise that resolves to the JSON response.
 */
export function fetchData(uri, callBack, method = "GET", data) {
  const signal = new AbortController().signal;

  async function fetchDataInternal() {
    /** @type {Object} */
    const requestOptions = {
      method,
      mode: "cors",
      redirect: "error",
      headers: {
        Accept: "application/json",
      },
      signal,
    };

    if (method === "POST" || method === "PATCH") {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(data);
    }

    fetch(config.api.url + uri, requestOptions)
      .then((response) => {
        let contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Wrong content type");
        }

        return response.json();
      })
      .then((json) => {
        if (json.message) {
          throw new Error(
            method + " " + config.api.url + uri + " returns " + json.message
          );
        }

        callBack(json);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error.message);
      });
  }

  fetchDataInternal();

  return signal;
}
