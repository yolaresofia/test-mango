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

  it("should display value after data has been fetched", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      expect(screen.getByText("Exercise 1: Normal Range")).toBeInTheDocument();
    });
    expect(screen.getByTestId("minValueLabel")).toHaveTextContent("€10");
    expect(screen.getByTestId("maxValueLabel")).toHaveTextContent("€100");
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

  it("should allow user to change min value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("minValueLabel"));
      const minValueInput = screen.getByTestId(
        "minValueInput"
      ) as HTMLInputElement;

      fireEvent.change(minValueInput, { target: { value: "20" } });
      fireEvent.blur(minValueInput);

      expect(screen.getByTestId("minValueLabel")).toHaveTextContent("€20");
    });
  });

  it("should allow user to change max value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("maxValueLabel"));
      const maxValueInput = screen.getByTestId(
        "maxValueInput"
      ) as HTMLInputElement;

      fireEvent.change(maxValueInput, { target: { value: "50" } });
      fireEvent.blur(maxValueInput);

      expect(screen.getByTestId("maxValueLabel")).toHaveTextContent("€50");
    });
  });

  it("should not allow min value to exceed max value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("maxValueLabel"));
      fireEvent.click(screen.getByTestId("minValueLabel"));
      const minValueInput = screen.getByTestId(
        "minValueInput"
      ) as HTMLInputElement;

      fireEvent.change(minValueInput, { target: { value: "1500" } });
      fireEvent.blur(minValueInput);

      expect(screen.getByTestId("minValueLabel")).toHaveTextContent("€10");
    });
  });

  it("should not allow max value to be less than min value", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("maxValueLabel"));
      const maxValueInput = screen.getByTestId(
        "maxValueInput"
      ) as HTMLInputElement;

      fireEvent.change(maxValueInput, { target: { value: "5" } });
      fireEvent.blur(maxValueInput);
      expect(screen.getByTestId("maxValueLabel")).toHaveTextContent("€100");
    });
  });

  it("should enlarge bullet and change cursor to draggable on hover", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const bullet = screen.getAllByTestId("range-bullet")[0];

      fireEvent.mouseOver(bullet);

      expect(bullet).toHaveClass("hover:h-5 hover:w-5");
      expect(bullet).toHaveClass("cursor-grab");
    });
  });
  
  it("should not allow dragging the min bullet to surpass the max bullet", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const rangeBullets = screen.getAllByTestId("range-bullet");

      const minBullet = rangeBullets[0];
      const maxBullet = rangeBullets[1];

      fireEvent.mouseDown(minBullet);
      fireEvent.mouseMove(document, {
        clientX: maxBullet.getBoundingClientRect().right + 10,
      });
      fireEvent.mouseUp(minBullet);

      const minBulletLeft = parseFloat(minBullet.style.left);
      const maxBulletLeft = parseFloat(maxBullet.style.left);

      expect(minBulletLeft).toBeLessThanOrEqual(maxBulletLeft);
    });
  });

  it("should change cursor to grabbing when bullet is dragged", async () => {
    render(<Exercise1 />);

    await waitFor(() => {
      const bullet = screen.getAllByTestId("range-bullet")[0];

      fireEvent.mouseDown(bullet);

      expect(bullet).toHaveClass("cursor-grabbing");

      fireEvent.mouseUp(bullet);

      expect(bullet).toHaveClass("cursor-grab");
    });
  });
});
