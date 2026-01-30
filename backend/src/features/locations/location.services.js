import {v2 as cloudinary} from 'cloudinary';
import Locations from './location.model.js';
import { locationSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getLocation = async ({ locationId }) => {
  if (!locationId) throw new BadRequestError('Location ID is required');

  const location = await Locations.findOne({ _id: locationId }).lean();
  if (!location) throw new Error('Failed to find location');

  return location;
}

export const getAllLocation = async () => {
  const locations = await Locations.find({}).lean();
  if (!locations) throw new Error('Failed to find locations');

  return locations;
}

export const storeLocation = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = locationSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const location = await Locations.create({ ...value});

  return location;
}

export const updateLocation = async ({ locationId, data }) => {
  if (!locationId) throw new BadRequestError('Location ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const keys = locationSchema._ids._byKey.keys().toArray();
  const optionalLocationsSchema = locationSchema.fork(keys, (field) => field.optional());

  const { value, error } = optionalLocationsSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const location = await Locations.findOneAndUpdate({ _id: locationId }, {...value });
  if (!location) throw new Error('Failed to find location');

  return location;
}

export const deleteLocation = async ({ locationId }) => {
  if (!locationId) throw new BadRequestError('Location ID is required');

  const oldLocation = await Locations.findOneAndDelete({ _id: locationId });
  if (!oldLocation) throw new Error('Failed to find and delete location');

  if (oldLocation.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldLocation.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldLocation.feature.public_id} from cloud`);
  }

  return oldLocation;
}

