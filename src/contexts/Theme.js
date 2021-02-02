import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
	palette: {
		primary: {
			main: "#F6A400",
		},
		secondary: {
			main: "#FBDB9E",
		},
		background: {
         default: "#FEF5E4"
      },
   },
   typography: {
      h2: {
         fontFamily: "Changa One"
      }
   },
   shape: {
      borderRadius: 50
   }
});
