import bearerToken from "../config";
const fetch = require("node-fetch");

async function requestRide(estimate) {
  const headers = new fetch.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + bearerToken);

  const data = JSON.stringify({
    requestedPickupAddress: estimate.requestedPickupAddress,
    requestedPickupLocation: estimate.requestedPickupLocation,
    requestedDropoffAddress: estimate.requestedDropoffAddress,
    requestedDropoffLocation: estimate.requestedDropoffLocation,
    estimateId: estimate.id,
  });
  const bookingResponse = await fetch("https://api.sparelabs.com/v1/requests", {
    method: "POST",
    headers: headers,
    body: data,
  });

  const booking = JSON.parse(await bookingResponse.text());
  return booking;
}

export { requestRide };
