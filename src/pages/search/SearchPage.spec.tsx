import { mockedSearchApi } from "../../../_test/setup/api-setup";
import {
  cleanup,
  renderWithProviders,
  screen,
  waitFor,
} from "../../../_test/utils/test-utils";
import SearchPage from "./SearchPage";

describe("search-page", () => {
  beforeAll((): void => {
    mockedSearchApi.listen();
  });

  afterAll((): void => {
    mockedSearchApi.close();
  });

  afterEach((): void => {
    cleanup();
    mockedSearchApi.resetHandlers();
  });

  test("render", async () => {
    const { asFragment } = renderWithProviders(
      <SearchPage />,
      "/search?text=were"
    );

    await waitFor(() => {
      const searchLabel = screen.getByTestId<HTMLLabelElement>("search-label");

      expect(searchLabel.textContent).toBe("Results for : were");
    });

    await waitFor(() => {
      expect(screen.queryAllByAltText("poster")).toHaveLength(3);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
