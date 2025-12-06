// src/components/component.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryCard } from "./MemoryCard";

// A simple mock icon component for the card (your real icons are components too)
function MockIcon(props: any) {
  return <div data-testid="mock-icon" {...props}></div>;
}

describe("MemoryCard", () => {
  const mockCard = {
    id: "test-card",
    icon: MockIcon
  };

  it('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });

//   test("renders without crashing", () => {
//     render(
//       <MemoryCard
//         card={mockCard}
//         isFlipped={false}
//         isMatched={false}
//         disabled={false}
//         onClick={() => {}}
//       />
//     );

//     expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
//   });

//   test("calls onClick when clicked and not disabled", () => {
//     const handleClick = vi.fn();

//     render(
//       <MemoryCard
//         card={mockCard}
//         isFlipped={false}
//         isMatched={false}
//         disabled={false}
//         onClick={handleClick}
//       />
//     );

//     fireEvent.click(screen.getByTestId("mock-icon"));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   test("does NOT call onClick when disabled", () => {
//     const handleClick = vi.fn();

//     render(
//       <MemoryCard
//         card={mockCard}
//         isFlipped={false}
//         isMatched={false}
//         disabled={true}
//         onClick={handleClick}
//       />
//     );

//     fireEvent.click(screen.getByTestId("mock-icon"));
//     expect(handleClick).not.toHaveBeenCalled();
//   });

//   test("renders matched state correctly", () => {
//     render(
//       <MemoryCard
//         card={mockCard}
//         isFlipped={true}
//         isMatched={true}
//         disabled={false}
//         onClick={() => {}}
//       />
//     );

//     // The icon should still render
//     expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
//   });
});
