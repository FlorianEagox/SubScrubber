const port = 8080;
const baseURL = `https://example.com`;

export default {
  JWTsecret: '',
  baseURL: baseURL,
  port: port,
  oauth2Credentials: {
    client_id: "",
    project_id: "",
    auth_uri: "",
    token_uri: "",
    auth_provider_x509_cert_url: "",
    client_secret: "",
    redirect_uris: [],
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl'
    ]
  }
};