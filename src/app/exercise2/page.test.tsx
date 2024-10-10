import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("should display value after data has been fetched", async () => {
    render(<Exercise2 />);

    await waitFor(() => {
      expect(screen.getByText("1.99")).toBeInTheDocument();
      expect(screen.getByText("70.99")).toBeInTheDocument();
    });
  });

  it("should allow only selecting fixed values in the range", async () => {
    render(<Exercise2 />);
  
    await waitFor(() => {
      const rangeBullets = screen.getAllByTestId("range-bullet");
      expect(rangeBullets.length).toBe(2);

      const bulletValues = rangeBullets.map(bullet => bullet.style.left);

      const fixedPositions = ["0%", "100%"];
      bulletValues.forEach((value, index) => {
        expect(value).toBe(fixedPositions[index]);
      });
    });
  });
  
  it("should display fixed values as non-editable labels", async () => {
    render(<Exercise2 />);
  
    await waitFor(() => {
      expect(screen.getByText("1.99")).toBeInTheDocument();
      expect(screen.getByText("70.99")).toBeInTheDocument();
      const inputs = screen.queryAllByRole("textbox");
      expect(inputs.length).toBe(0);
    });
  });

  it("should ensure min value never exceeds max value and vice versa", async () => {
    render(<Exercise2 />);

    await waitFor(() => {
      const rangeBullets = screen.getAllByTestId("range-bullet");

      const minBullet = rangeBullets[0];
      const maxBullet = rangeBullets[1];

      fireEvent.mouseDown(minBullet);
      fireEvent.mouseMove(document, { clientX: maxBullet.getBoundingClientRect().right + 10 });
      fireEvent.mouseUp(minBullet);

      const minBulletStyle = minBullet.style.left;
      const maxBulletStyle = maxBullet.style.left;

      expect(parseFloat(minBulletStyle)).toBeLessThanOrEqual(parseFloat(maxBulletStyle));

      fireEvent.mouseDown(maxBullet);
      fireEvent.mouseMove(document, { clientX: minBullet.getBoundingClientRect().left - 10 });
      fireEvent.mouseUp(maxBullet);

      expect(parseFloat(maxBulletStyle)).toBeGreaterThanOrEqual(parseFloat(minBulletStyle));
    });
  });

});
