let baseUri = "http://localhost:5000";

export const client_url = "http://localhost:5173";

if (process.env.NODE_ENV == "development") {
  baseUri = "http://localhost:5000";
}

export default baseUri;
