import styled, { css } from 'styled-components';

const UnAnswerBefore = css`
&:before{
  content: "";
  position: absolute;
  right: 5px;
  top: 5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg-caution);
}
`
const AnswerBefore = css`
&:before{
  content: "";
  position: absolute;
  right: 5px;
  top: 5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #2ecc71;
}
`
const StatusBox = styled.div`
width: 106px;
height: 25px;
background: #e6e6e6;
color: #333;
font-size: 11px;
border-radius: 0 10px 10px 15px;
line-height: 23px;
padding-left: 12px;
position: relative;
display: flex;
justify-content: flex-end;
align-items: center;
border: 2px solid #d1d0d3;
${props => props.answer === 0 ? UnAnswerBefore : AnswerBefore}
`

export default StatusBox;