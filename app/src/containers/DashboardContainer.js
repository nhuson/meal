import React from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import logo from "assets/img/crossed-knife-and-fork.png";
import color from "../variables/color"
import Alert from "../components/Alert"

const switchRoutes = (
	<Switch>
		{dashboardRoutes.map((prop, key) => {
			if (prop.redirect)
				return <Redirect from={prop.path} to={prop.to} key={key} />;
			return <Route path={prop.path} component={prop.component} key={key} />;
		})}
	</Switch>
);

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileOpen: false
		};
		this.resizeFunction = this.resizeFunction.bind(this);
	}
	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};
	getRoute() {
		return this.props.location.pathname !== "/maps";
	}
	resizeFunction() {
		if (window.innerWidth >= 960) {
			this.setState({ mobileOpen: false });
		}
	}
	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			const ps = new PerfectScrollbar(this.refs.mainPanel);
		}
		window.addEventListener("resize", this.resizeFunction);
	}
	componentDidUpdate(e) {
		if (e.history.location.pathname !== e.location.pathname) {
			this.refs.mainPanel.scrollTop = 0;
			if (this.state.mobileOpen) {
				this.setState({ mobileOpen: false });
			}
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeFunction);
	}
	render() {
		const { classes, errorAlert, ...rest } = this.props;
		return (
			<div className={classes.wrapper}>
				{/* Show alert common */}
        {errorAlert.status ? (<Alert message={errorAlert.message} open={true} type={errorAlert.type} />) : ''}
				<Sidebar
					routes={dashboardRoutes}
					logoText={"Meal Plan"}
					logo={logo}
					background={color.MAIN}
					handleDrawerToggle={this.handleDrawerToggle}
					open={this.state.mobileOpen}
					color={color.MENU_ACTIVE}
					{...rest}
				/>
				<div className={classes.mainPanel} ref="mainPanel">
					<Header
						routes={dashboardRoutes}
						handleDrawerToggle={this.handleDrawerToggle}
						{...rest}
					/>
					{/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
					{this.getRoute() ? (
						<div className={classes.content}>
							<div className={classes.container}>{switchRoutes}</div>
						</div>
					) : (
							<div className={classes.map}>{switchRoutes}</div>
						)}
					{this.getRoute() ? <Footer /> : null}
				</div>
			</div>
		);
	}
}

DashboardContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

const AppStyle = withStyles(dashboardStyle)(DashboardContainer)

const mapStateToProps = state => {
  return {
    loading: state.loading.status,
		errorAlert: state.alert
  }
}

export default connect(mapStateToProps, null)(AppStyle)
