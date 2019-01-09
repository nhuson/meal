import FormValidator from './FormValidator';

const registerValid = new FormValidator([
	{
		field: 'firstname',
		method: 'isEmpty',
		validWhen: false,
		message: 'FirstName is required.',
	},
	{
		field: 'lastname',
		method: 'isEmpty',
		validWhen: false,
		message: 'LastName is required.',
	},
	{
		field: 'email',
		method: 'isEmpty',
		validWhen: false,
		message: 'Email is required.',
	},
	{
		field: 'email',
		method: 'isEmail',
		validWhen: true,
		message: 'That is not a valid email.',
	},
	{
		field: 'password',
		method: 'isEmpty',
		validWhen: false,
		message: 'Password is required.',
	},
	{
		field: 'password',
		method: 'isLength',
		args: [{ min: 6, max: 30 }],
		validWhen: true,
		message: 'Password must be between 6 and 30 characters',
	},
]);

export default registerValid;
