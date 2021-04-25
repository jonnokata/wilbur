import { injectGlobal } from "styled-components";

const GlobalStyle = injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
body {
    font-family: "DM Sans", sans-serif;
}
`;

export { GlobalStyle };
