import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ProcurementDashboard } from "../pages";
import { ProcurementNotification } from "../pages";

//check whether the procument dashboard is rendered
describe("Procurement Dashboard", () => {
  it("should be able to render the dashboard", () => {
    const { getByText } = render(<ProcurementDashboard />);

    expect(getByText("Dashboard")).toBeTruthy();
  });
});

//check whether the procurement notification is rendered
describe("Procurement Notification", () => {
  it("should be able to render the notification", () => {
    const { getByText } = render(<ProcurementNotification />);

    expect(getByText("Notificações")).toBeTruthy();
  });
});
