class Validations {
  emailValidator(email: String) {
    return (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(`${email}`) ||
      "email inválido"
    );
  }

  passwordValidator(password: String) {
    return password.length > 7 || "min 8 caracteres";
  }

  confirmPasswordValidator(password: String, confirmPassword: String) {
    if (confirmPassword.length > 7) {
      return confirmPassword == password || "senhas diferentes";
    }
    return "min 8 caracteres";
  }

  userNameValidator(name: String) {
    return name.length > 3 || "Nome inválido";
  }
}

export { Validations };
