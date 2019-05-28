import { createMuiTheme } from "@material-ui/core/styles";
import Color from "color";

const defaultTheme = {
  palette: {
    primary: "#5c90d2",
    secondary: "#2c689c",
    thirdly: "#333333",
    background: "#ececec",
    danger: "#b7433f",
    success: "#559554",
    warning: "#e8db05",
    default: "#b9b9b9",
    fontSubtle: "#686868",
    body: "#ececec",
    grey: "#e0e0e0"
  },
  basic: {
    body: {
      margin: "0px",
      padding: "0px",
      fontSize: "16px"
    },
    html: {
      margin: "0px",
      padding: "0px"
    }
  },
  components: {}
};

class Theme {
  constructor() {
    this.config = { ...defaultTheme };
  }
  init(override = false) {
    if (override.palette)
      override.palette = { ...this.config.palette, ...override.palette };
    if (override) this.config = { ...this.config, ...override };

    const bodyCss = this.config.basic.body;
    Object.keys(bodyCss).forEach(attr => {
      document.body.style[attr] = bodyCss[attr];
    });
    document.body.style.backgroundColor = this.config.palette.background;
  }
  getConfig() {
    return this.config;
  }
  getStyle(component, defaultStyle = false) {
    const style = this.getComponentsStyleOverride();
    const { palette } = this.config;
    return style ? style({ palette }) : defaultStyle({ palette });
  }
  getComponentsStyleOverride(component) {
    let styles = this.config.components;
    try {
      switch (component) {
        case "Block":
          return component.Block;
        case "Layouter":
          return styles.Layouter;
        case "Layout/Admin":
          return styles.Layout.Admin;
        case "Layout/EmptyPage":
          return styles.Layout.EmptyPage;
        case "Form":
          return styles.Form.index;
        case "Form/Fields/Date":
          return styles.Form.Fields.Date;
        case "Form/Fields/MultiSelect":
          return styles.Form.Fields.MultiSelect;
        case "Form/Fields/Radio":
          return styles.Form.Fields.Radio;
        case "Form/Fields/Range":
          return styles.Form.Fields.Range;
        case "Form/Fields/Select":
          return styles.Form.Fields.Select;
        case "Form/Fields/Text":
          return styles.Form.Fields.Text;
        case "Form/Fields/Time":
          return styles.Form.Fields.Time;
        case "History":
          return styles.History;
        case "Browser":
          return styles.Browser;
        case "Pagination":
          return styles.Pagination;
        case "Sorting":
          return styles.Sorting;
        case "SubAppBar":
          return styles.SubAppBar;
        case "Buttons/Fab":
          return styles.Buttons.Fab;
        case "Buttons/Button":
          return styles.Buttons.Button;
        case "Buttons/DrawerButton":
          return styles.Buttons.DrawerButton;
        default:
          return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  convert(type) {
    const { palette, darken } = this.config;
    switch (type) {
      case "material-ui":
        let mUiTheme = {
          shadows: Array(25).fill("none"),
          palette: {},
          typography: {
            useNextVariants: true
          }
        };
        for (const color in palette) {
          mUiTheme.palette[color] = {
            main: palette[color],
            dark: Color(palette.primary)
              .darken(darken)
              .hex()
          };
        }

        return createMuiTheme(mUiTheme);
      default:
        console.log("conversion type for theme not defined");
    }
  }
}
const theme = new Theme();
export default theme;
