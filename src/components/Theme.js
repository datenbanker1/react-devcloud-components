import { createMuiTheme } from "@material-ui/core/styles";
import Color from "color";

const defaultTheme = {
  palette: {
    primary: "#5c90d2",
    secondary: "#2d467d",
    thirdly: "#2c343f",
    background: "#ececec",
    danger: "#b7433f",
    success: "#559554",
    warning: "#e8db05",
    default: "#b9b9b9",
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
  init(config = false) {
    if (config) this.config = config;
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
        default:
          return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  convert(type) {
    const { palette, darken, lighten } = this.config;
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
    }
  }
}
const theme = new Theme();
export default theme;
