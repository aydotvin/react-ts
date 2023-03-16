import { renderWithProviders } from "@utils/renderWithProviders";

import App from "./App";

describe("App", () => {
  it("renders welcome message", () => {
    const isSignedIn = true;

    const { getByText } = renderWithProviders(<App isSignedIn={isSignedIn} />);
    const welcomeMessage = getByText("Welcome to homepage");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
