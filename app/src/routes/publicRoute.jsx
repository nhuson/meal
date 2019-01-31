import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			!localStorage.getItem('jwtToken') ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/dashboard',
						state: {
							from: props.location,
						},
					}}
				/>
			)
		}
	/>
)
