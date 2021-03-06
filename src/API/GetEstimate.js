import { getHeaders } from "./GetHeaders";
import { data } from "../Components/Seed";
const fetch = require("node-fetch");

async function getEstimate(pickupAddress, dropoffAddress, ts) {
  const requestedPickupAddress = pickupAddress;
  var requestedPickupLatitude,
    requestedPickupLongitude,
    requestedDropoffLatitude,
    requestedDropoffLongitude;
  const requestedDropoffAddress = dropoffAddress;
  const requestedPickUpts = ts;
  data.forEach((item, index) => {
    if (item.address === pickupAddress) {
      requestedPickupLatitude = item.lat;
      requestedPickupLongitude = item.lon;
    }
    if (item.address === dropoffAddress) {
      requestedDropoffLatitude = item.lat;
      requestedDropoffLongitude = item.lon;
    }
  });
  const url =
    "https://api.sparelabs.com/v1/estimates/request?requestedPickupAddress=" +
    requestedPickupAddress.split(" ").join("+") +
    "&requestedDropoffAddress=" +
    requestedDropoffAddress.split(" ").join("+") +
    "&requestedPickupLatitude=" +
    requestedPickupLatitude +
    "&requestedPickupLongitude=" +
    requestedPickupLongitude +
    "&requestedDropoffLatitude=" +
    requestedDropoffLatitude +
    "&requestedDropoffLongitude=" +
    requestedDropoffLongitude +
    "&requestedPickupTs=" +
    requestedPickUpts +
    "&requestedFlexibility=3600&serviceId=d8719067-5e07-42fe-ba72-c9c6a84c2433&numRiders=1&createdInterface=riderInterface";

  const headers = getHeaders();
  // Create estimate
  const estimateResponse = await fetch(url, {
    headers: headers,
  });
  console.log(estimateResponse);
  const text = await estimateResponse.text();
  const estimate = JSON.parse(await text);
  console.log("estimate", estimate);
  return await estimate;
}

export { getEstimate };
