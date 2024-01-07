import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: stirng;
      lighter: stirng;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}
