import styled from 'styled-components'

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <>

    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://image.flaticon.com/icons/png/512/2855/2855880.png" alt="Logo Alura" />
       </a>
      <p>
        Trabalho orgulhosamente proposto para
        {' '}
        a
        {' '}
        <a href="http://www.uftm.edu.br/engenharia-quimica">
          <span>disciplina de CQCR2 ; UFTM - 2020.2</span>
        </a>
      </p> 

    </FooterWrapper>
    <div>
    <iframe src="https://chat-912x6500w-rafaelfeliciano1.vercel.app/" style=" width: 100%; height: 300px;background-color: wheat;"/>
    </div> 

    </>
  );
}