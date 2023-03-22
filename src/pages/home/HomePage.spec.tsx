import { mockedMoviesApi } from "../../../_test/setup/api-setup";
import {
  cleanup,
  renderWithProviders,
  screen,
  waitFor,
  fireEvent,
  mockedUseNavigate,
} from "../../../_test/utils/test-utils";
import HomePage from "./HomePage";

describe("home-page", () => {
  beforeAll((): void => {
    mockedMoviesApi.listen();
  });

  afterAll((): void => {
    mockedMoviesApi.close();
  });

  afterEach((): void => {
    cleanup();
    mockedMoviesApi.resetHandlers();
  });

  test("render", async () => {
    const { asFragment } = renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(screen.queryAllByAltText("poster").length).toBe(3);
    });

    fireEvent.click(screen.getByTestId("movie-card-315162"));

    expect(mockedUseNavigate).toHaveBeenCalledWith("/detail/315162");

    expect(asFragment()).toMatchSnapshot();
  });
});
