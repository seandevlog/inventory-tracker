export let accessToken;

export const refresh = async () => {
    const res = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include'
    })

    const data = await res.json();

    return data.accessToken;
}

export default {
    accessToken,
    refresh
}