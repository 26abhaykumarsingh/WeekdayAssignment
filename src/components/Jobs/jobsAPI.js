export function fetchJobs(limit, offset) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const body = JSON.stringify({
    limit: limit,
    offset: offset,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        // console.log("apirunning");
        return response.json();
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error.message));
  });
}
