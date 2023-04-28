import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const SvgLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 149.07 151.26"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="Logo_svg__a"
        x1={1.53}
        x2={149.07}
        y1={57.02}
        y2={57.02}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#4b94bb" />
        <Stop offset={1} stopColor="#312782" />
      </LinearGradient>
      <LinearGradient
        xlinkHref="#Logo_svg__a"
        id="Logo_svg__b"
        x1={0}
        x2={147.77}
        y1={103.02}
        y2={103.02}
      />
    </Defs>
    <G data-name="Capa 2">
      <G data-name="Capa 1">
        <Path
          d="M55 50.3 69.57 114l13.3-72.27 13.27 54.89 49-1.41-34.44-19.57L149.07 53 131 21.72 91.73 44.4V0H56.4v44.37L18.07 21.72 1.53 50.3Z"
          style={{
            fill: "url(#Logo_svg__a)",
          }}
        />
        <Path
          d="m147.74 99.69-55.11 1.51-9.16-37.89L70 136.29 51.46 54.78H3.09l35.27 20.86L0 97.45l18.07 31.21L56.48 106v45.29h36.17V106L131 128.66l16.77-29Z"
          style={{
            fill: "url(#Logo_svg__b)",
          }}
        />
      </G>
    </G>
  </Svg>
);
export default SvgLogo;

