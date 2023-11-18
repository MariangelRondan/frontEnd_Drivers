// FormPage.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import FormPage from "../src/components/FormPage/FormPage";

// Configurar axios mock
const mock = new MockAdapter(axios);
const teamsData = [
  { id: 1, name: "McLaren" },
  { id: 2, name: "Mercedes" },
];

mock.onGet("http://localhost:3001/teams").reply(200, teamsData);

describe("FormPage", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<FormPage />);

    // Asegúrate de ajustar estas aserciones según tu estructura real de componente y las etiquetas utilizadas
    expect(getByText("New driver")).toBeInTheDocument();
    expect(getByPlaceholderText("Name...")).toBeInTheDocument();
    expect(getByPlaceholderText("Lastname....")).toBeInTheDocument();
    // ... Añade más aserciones según sea necesario
  });

  it("submits form successfully", async () => {
    const { getByText, getByPlaceholderText } = render(<FormPage />);

    // Simular la respuesta de la solicitud de equipos
    await waitFor(() => expect(getByText("McLaren")).toBeInTheDocument());

    // Simular la escritura en el formulario
    fireEvent.change(getByPlaceholderText("Name..."), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Lastname...."), {
      target: { value: "Doe" },
    });
    // ... Simular más cambios en el formulario según sea necesario

    // Simular el envío del formulario
    fireEvent.click(getByText("Create"));

    // Asegurarse de que se alerte sobre la creación exitosa
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Driver created successfully")
    );
  });

  it("handles form submission error", async () => {
    const { getByText, getByPlaceholderText } = render(<FormPage />);

    // Simular la respuesta de la solicitud de equipos
    await waitFor(() => expect(getByText("McLaren")).toBeInTheDocument());

    // Simular la escritura en el formulario
    fireEvent.change(getByPlaceholderText("Name..."), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Lastname...."), {
      target: { value: "Doe" },
    });
    // ... Simular más cambios en el formulario según sea necesario

    // Simular un error en la solicitud de envío del formulario
    mock
      .onPost("http://localhost:3001/drivers")
      .reply(500, { error: "Internal Server Error" });

    // Simular el envío del formulario
    fireEvent.click(getByText("Create"));

    // Asegurarse de que se alerte sobre el error
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Error: Internal Server Error")
    );
  });
});
