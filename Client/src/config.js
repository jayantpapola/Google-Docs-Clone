let baseUri = "http://localhost:5000";

if (process.env.NODE_ENV == "development") {
  baseUri = "http://localhost:5000";
}

export default baseUri;
