import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../src/state/store";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({
    id: "943822",
    type: "favorite",
  }),
}));

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={createTheme({})}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  route?: string,
  options?: Omit<RenderOptions, "wrapper">
) => {
  window.history.pushState({}, "test-case", route);
  return render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as renderWithProviders, mockedUseNavigate };
