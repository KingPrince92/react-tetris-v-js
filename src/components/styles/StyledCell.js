import styled from 'styled-components';

export const StyledCell = styled.div`
width: auto;
background: rgba(${props => props.color}, 0.8);
border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
border-bottom-color: rgba(${props => props.color}, 0.1);
border-right-color: rgba(${props => props.color}, 1);
border-top-color: rgba(${props => props.color}, 1);
border-left-color: rgba(${props => props.color}, 0.3);
`
// for the color of the blocks/cells, we're grabbing props from the Cell component, which is in turn being passed the values for the cell type and cell color from the Tetrominos helpers. The color is the same rgba value from the Tetrominos file, with the alpha value changing opacity to replicate shadows/depth of the blocks.