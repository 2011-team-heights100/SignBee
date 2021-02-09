import { createMuiTheme, fade } from "@material-ui/core/styles";

export default createMuiTheme({
	palette: {
		primary: {
			main: "#F6A400",
		},
		secondary: {
			main: "#FBDB9E",
		},
		background: {
			default: "#FEF5E4",
		},
	},
	typography: {
		h2: {
			fontFamily: "Changa One",
			marginBottom: 20,
		},
		h5: {
			// fontFamily: "Changa One",
			fontWeight: "bold",
		},
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: 50,
				minWidth: 160,
				height: 40,
				marginTop: 10,
				marginBottom: 10,
				marginLeft: 20,
				marginRight: 20,
			},
		},
		MuiDialog: {
			paper: {
				borderRadius: 20,
				opacity: "80%",
				padding: 15,
			},
		},
		// MuiDialogTitle: {
		// 	root: {
		// 		fontWeight: "bold",
		// 	},
		// },
		MuiPaper: {
			root: {
				opacity: fade("#FFFFFF", 0.7),
			},
		},
		MuiTextField: {
			root: {
				padding: 7,
				height: 50,
			},
		},
	},
	props: {
		MuiButton: {
			variant: "contained",
			color: "primary",
		},
		MuiTextField: {
			variant: "outlined",
		},
	},
});
