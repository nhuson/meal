export const categoryValidations = [{
    field: "title",
    method: "isEmpty",
    validWhen: false,
    message: "title is required."
  },
  {
    field: "description",
    method: "isEmpty",
    validWhen: false,
    message: "description is required."
  }
]