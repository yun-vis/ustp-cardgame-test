import { render, screen } from "@testing-library/react";
import MemoryCard from "./MemoryCard";

test("renders greeting", () => {
  render(<MemoryCard />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});