import styled from "styled-components"
import CardMedia from '@material-ui/core/CardMedia';

const ImageView = styled(CardMedia)`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width:  ${props => props.width};
    height: ${props => props.height};`;

export default ImageView   