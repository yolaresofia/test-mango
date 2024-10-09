
import { render, screen, waitFor } from "@testing-library/react";
import Exercise2 from "./page";

global.fetch = jest.fn();


describe("<Exercise2 />", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(<Exercise2 />);
    expect(screen.getByText("Values not found")).toBeInTheDocument();
  });

  it("should render the range component and values when data is loaded", async () => {
    render(<Exercise2 />);
    await waitFor(() => {
      expect(
        screen.getByText("Exercise 2: Fixed Values Range")
      ).toBeInTheDocument();
      expect(screen.getByText("Min Value: 1.99")).toBeInTheDocument();
      expect(screen.getByText("Max Value: 70.99")).toBeInTheDocument();
      expect(screen.getByRole("heading")).toHaveTextContent(
        "Exercise 2: Fixed Values Range"
      );
    });
  });

  it("should ensure min value is less than or equal to max value", async () => {
    render(<Exercise2 />);
    await waitFor(() => {
      const minValueText = screen.getByText(/Min Value: (\d+(\.\d+)?)/i);
      const maxValueText = screen.getByText(/Max Value: (\d+(\.\d+)?)/i);

      const minValue = parseFloat(
        minValueText.textContent?.replace("Min Value: ", "") || "0"
      );
      const maxValue = parseFloat(
        maxValueText.textContent?.replace("Max Value: ", "") || "0"
      );

      expect(minValue).toBeLessThanOrEqual(maxValue);
    });
  });
});
