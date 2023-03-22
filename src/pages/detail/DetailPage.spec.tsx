import {
  mockedDetailApi,
  mockedVideoApi,
} from "../../../_test/setup/api-setup";
import {
  cleanup,
  renderWithProviders,
  screen,
  waitFor,
} from "../../../_test/utils/test-utils";
import DetailPage from "./DetailPage";

describe("detail-page", () => {
  beforeAll((): void => {
    mockedDetailApi.listen();
    mockedVideoApi.listen();
  });

  afterAll((): void => {
    mockedDetailApi.close();
    mockedVideoApi.close();
  });

  afterEach((): void => {
    cleanup();
    mockedDetailApi.resetHandlers();
    mockedVideoApi.resetHandlers();
  });

  test("render", async () => {
    const { asFragment } = renderWithProviders(<DetailPage />);

    await waitFor(() => {
      const movieLabel =
        screen.getByTestId<HTMLHeadingElement>("movie-title-label");

      expect(movieLabel.textContent).toBe(
        "Prizefighter: The Life of Jem Belcher"
      );
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
