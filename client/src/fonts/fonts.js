import { injectGlobal } from "styled-components";
import NotoSansV2FontWoff from "./NotoSansV2.woff";
import NotoSansV2FontWoff2 from "./NotoSansV2.woff2";

export default injectGlobal`
    @font-face {
        font-family: 'Noto Sans V2';
        url(${NotoSansV2FontWoff2}) format('woff2'),
        url(${NotoSansV2FontWoff}) format('woff');
    }
`;
