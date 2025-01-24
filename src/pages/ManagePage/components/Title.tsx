import styled from 'styled-components';
interface TitleProps {
  text: string;
}
const Title = ({ text }: TitleProps) => {
  return <TitleStyled>{text}</TitleStyled>;
};

export default Title;

const TitleStyled = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.tl};
  font-weight: bold;
`;
