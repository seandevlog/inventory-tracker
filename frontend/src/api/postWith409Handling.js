import axios from "axios";

export const postWith409Handling = async ({ url, formData, accessToken }) => {
  try {
    const { data } = await axios.post( url, formData, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    return { data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409) {
        return { error: err.response.data?.error }
      }
    }
    throw err;
  }
}