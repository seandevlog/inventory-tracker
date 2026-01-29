import { redirect } from "react-router-dom";
import { 
  get as getLocation,
  getAll as getAllLocations
} from "../services";

const path = 'location';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllLocations({ accessToken, path });
  const { locations } = data;

  return locations;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getLocation({ id: params.locationId, accessToken, path });

  const { error, location } = data;
  
  if (error) return redirect('/');

  return location;
}