const validator = require("validator");

module.exports = class FormValidator {
  constructor(validations) {
    this.validations = validations;
  }

  validate(state) {
    let validation = this.valid();
    this.validations.forEach(rule => {
      if (!validation[rule.field].isInvalid) {
        var field_value = state[rule.field];
        if (field_value === undefined || field_value === null) {
          field_value = "";
        }
        const args = rule.args || [];
        const validation_method =
          typeof rule.method === "string"
            ? validator[rule.method]
            : rule.method;

        if (validation_method(field_value, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  prettyValidate(state) {
    const validation = this.validate(state);
    const errors = [];
    Object.keys(validation).forEach(key => {
      const value = validation[key];
      if (typeof value === "object" && value["isInvalid"]) {
        errors.push(value["message"]);
      }
    });

    return { isValid: validation.isValid, errors: errors };
  }

  valid() {
    const validation = {};
    this.validations.map(
      rule => (validation[rule.field] = { isInvalid: false, message: "" })
    );

    return { isValid: true, ...validation };
  }
};
