
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Exercise1 from "./page";

global.fetch = jest.fn();

describe("Exercise1 Page", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        values: [10, 100],
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(<Exercise1 />);
    expect(screen.getByText("Values not found")).toBeInTheDocument();
  });

  it("should display the fetched data after loading", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      expect(screen.getByText("Exercise 1: Normal Range")).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Min Value:")).toHaveValue(10);
    expect(screen.getByLabelText("Max Value:")).toHaveValue(100);
  });

  it("should display 'Values not found' when no values are fetched", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ values: [] }),
    });

    render(<Exercise1 />);

    await waitFor(() => {
      expect(screen.getByText("Values not found")).toBeInTheDocument();
    });
  });

  it("should not allow min value to exceed max value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const minValueInput = screen.getByLabelText(
        "Min Value:"
      ) as HTMLInputElement;
      fireEvent.change(minValueInput, { target: { value: "150" } });
      fireEvent.blur(minValueInput);
      expect(Number(minValueInput.value)).toBeLessThanOrEqual(
        Number((screen.getByLabelText("Max Value:") as HTMLInputElement).value)
      );
    });
  });

  it("should not allow max value to be less than min value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const maxValueInput = screen.getByLabelText(
        "Max Value:"
      ) as HTMLInputElement;
      fireEvent.change(maxValueInput, { target: { value: "5" } });
      fireEvent.blur(maxValueInput);
      expect(Number(maxValueInput.value)).toBeGreaterThanOrEqual(
        Number((screen.getByLabelText("Min Value:") as HTMLInputElement).value)
      );
    });
  });

  it("should save input value on Enter key press", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const minValueInput = screen.getByLabelText(
        "Min Value:"
      ) as HTMLInputElement;
      fireEvent.change(minValueInput, { target: { value: "25" } });
      fireEvent.keyDown(minValueInput, { key: "Enter", code: "Enter" });
      expect(minValueInput.value).toBe("25");
    });
  });
});
