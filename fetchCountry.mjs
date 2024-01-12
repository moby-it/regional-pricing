import axios from "axios";
import * as v from 'valibot';

function getCountryApiUrl(lat, lon) {
  return `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=3&format=jsonv2&accept-language=en`;
}
export async function fetchCountry(lat, lon) {
  const res = await axios.get(getCountryApiUrl(lat, lon));
  if (res.status !== 200) return;
  const addressSchema = v.object({
    country: v.string()
  });
  const responseSchema = v.object({
    address: addressSchema
  });
  const valiRes = v.safeParse(responseSchema, res.data);

  if (valiRes.success)
    return valiRes.output.address.country;
  else {
    console.error("schema validation failed", valiRes.issues);
    return;
  }
};