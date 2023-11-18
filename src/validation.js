function validation(formData) {
  const ExpRegSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

  const errors = {};

  if (
    !ExpRegSoloLetras.test(formData.name) ||
    formData.name.length === 0 ||
    formData.name.length > 20
  ) {
    errors.name = "Must enter a valid name!";
  }

  if (new Date(formData.dob) > new Date()) {
    errors.dob = "Invalid date of birth!";
  } else {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (new Date(formData.dob) > eighteenYearsAgo) {
      errors.dob = "Driver must be at least 18 years old!";
    }
  }

  if (
    !ExpRegSoloLetras.test(formData.lastname) ||
    formData.lastname.length === 0 ||
    formData.lastname.length > 20
  ) {
    errors.lastname = "Must enter a valid lastname!";
  }

  if (
    !ExpRegSoloLetras.test(formData.description) ||
    formData.description.length === 0 ||
    formData.description.length > 20
  ) {
    errors.description = "Must enter a valid nationality!";
  }

  return errors;
}

export default validation;
