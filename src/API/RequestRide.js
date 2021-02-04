import { getHeaders } from "./GetHeaders";
const fetch = require("node-fetch");

async function requestRide(estimate) {
  const headers = getHeaders();
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
  console.log(booking);
  return booking;
}

export { requestRide };
