import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { measurePerformance } from "reassure";
import Home from "../pages/index";

test("Home Performance", async () => {
  const scenario = async () => {
    Array.from({ length: 5 }).forEach(() => {
      fireEvent.click(screen.getByText("Toggle State"));
    });
  };

  await measurePerformance(<Home />, { scenario });
});