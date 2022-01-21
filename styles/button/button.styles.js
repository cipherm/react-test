import styled from "styled-components"
import { button } from "../../components/index"
import COLORS from "../../constants/colors";

export const Button = styled(button)`
    background: ${({ bg }) => bg};
    color: ${COLORS.white};
    width: 200px;
    height: 50px;
    border-radius: 5px;
    margin: 0 10px;
`