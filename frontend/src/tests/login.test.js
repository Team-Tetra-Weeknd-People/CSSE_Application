import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Login from "../pages/Login/";

describe("Login page", () => {
  it("should be able to login", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "johndoe@mail.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);
  });
});
