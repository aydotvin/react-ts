export interface AppProps {
  isSignedIn: boolean;
}

export interface ErrorObject {
  statusCode: number;
  success: boolean;
  data?: {};
  message?: string;
}
