export async function apiCall(
  uri: string,
  options: RequestInit = {},
  retry = true
) {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(BASE_URL + uri, {
      ...options,
      credentials: "include",
    });

    // Access expired
    if (response.status === 401 && retry) {
      const refreshRes = await fetch(BASE_URL + "/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        // logout
        window.location.href = "/";
        throw new Error("Session expired");
      }

      // 🔁 retry original request
      return await apiCall(BASE_URL + uri, options, false);
    }

    if (!response.ok) {
      throw new Error("Please check email/password");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}