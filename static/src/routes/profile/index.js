import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";

class Profile extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
    const userId = 22;
		this.loadProfile(userId);
	}

	loadProfile(userId) {
		this.props.dispatch({
			type: "profile/loadProfile",
			payload: { userId }
		});
	}


	render() {
		return (
			<div>
				abc
			</div>
		);
	}
}

export default connect(({ profile }) => {
	return {
		
	};
})(Profile);
