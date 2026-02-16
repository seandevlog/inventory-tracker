import axios from "axios";

export const postWithErrorHandling = async ({ url, formData, accessToken }) => {
  try {
    const { data } = await axios.post( url, formData, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    return { data, error: null };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409 || err.response?.status === 403) {
        return { data: null, error: err.response.data?.error }
      }
    }
    throw err;
  }
}

export const patchWithErrorHandling = async ({ url, formData, accessToken }) => {
  try {
    const { data } = await axios.patch( url, formData, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    return { data, error: null };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409 || err.response?.status === 403) {
        return { data: null, error: err.response.data?.error };
      }
    }
    throw err;
  }
}

export const deleteWithErrorHandling = async ({ url, accessToken }) => {
  try {
    const { data } = await axios.delete( url, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    return { data, error: null };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409 || err.response?.status === 403) {
        return { data: null, error: err.response.data?.error };
      }
    }
    throw err;
  }
}