import ky from "ky";

type RefreshRespose = {
  access_token: string;
  token_type: "Bearer";
  expires_in: string;
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Ky doesn't support `timeout` in the same way, but you can use AbortController (we'll skip it for now unless you need it)

export const api = ky.create({
  prefixUrl: baseUrl,
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        console.info("Request URL:", request.url);
        const token = localStorage.getItem("access_token");
        if (token) {
          request.headers.set("Authorization", `Bearer: ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && localStorage.getItem("access_token")) {
          // attempt token refresh
          try {
            const refreshResponse = await ky
              .post(`${baseUrl}/api/v1/auth/refresh`, {
                credentials: "include", // send cookies
                json: {},
              })
              .json<RefreshRespose>();

            const newToken = refreshResponse.access_token;
            localStorage.setItem("access_token", newToken);

            // retry original request with new token
            return ky(request, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer: ${newToken}`,
              },
            });
          } catch (err) {
            console.error("Token refresh failed:", err);
            throw err;
          }
        }

        return response;
      },
    ],
  },
});
