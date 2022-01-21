import styled from "styled-components"
import COLORS from "../../constants/colors"
import { layout } from "../../components/index";

export const Layout = styled(layout)`
    background: ${({ bg }) => bg ? COLORS.yellow : COLORS.pureWhite};
    width: 100%;
    min-height:100vh;
    padding: 30px 0;
`