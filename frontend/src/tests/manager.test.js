import React from "react";
import { render, fireEvent } from "@testing-library/react";

import ManagerDashboard from "../pages/manager/PlaceOrders";
import ManagerNotification from "../pages/manager/Notifications";

//check whether the manager dashboard is rendered
describe("Manager Dashboard", () => {
  it("should be able to render the dashboard", () => {
    const { getByText } = render(<ManagerDashboard />);

    expect(getByText("Dashboard")).toBeTruthy();
  });
});

//check whether the manager notification is rendered
describe("Manager Notification", () => {
  it("should be able to render the notification", () => {
    const { getByText } = render(<ManagerNotification />);

    expect(getByText("Notificações")).toBeTruthy();
  });
});
