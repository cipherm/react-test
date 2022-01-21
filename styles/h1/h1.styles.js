import styled from "styled-components"
import { h1 } from "../../components/index"

export const H1 = styled(h1)`
    font-size: 25px;
    display: ${({ display }) => display};
`