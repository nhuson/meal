export const userValidations = [{
  field: "email",
  method: "isEmpty",
  validWhen: false,
  message: "Email is required."
},
{
  field: "email",
  method: "isEmail",
  validWhen: true,
  message: "That is not a valid email."
},
{
  field: "firstname",
  method: "isEmpty",
  validWhen: false,
  message: "First name is required."
},
{
  field: "lastname",
  method: "isEmpty",
  validWhen: false,
  message: "Last name is required."
},

]