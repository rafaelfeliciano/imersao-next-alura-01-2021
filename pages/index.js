import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

/* function Title(props) {
    return <h1>{props.children}</h1>
} */

const BackgroundImage = styled.div`
    background-image: url(${db.bg});
    background-position: 'center';
    background-size: 'cover';
    background-repeat: no-repeat;
    flex: 1; 
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <Widget>
                    <Widget.Header>
                        <h1>When will we run again?</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <p>Oksd aksdoak osda ksodk osdka, dsiji.</p>
                    </Widget.Content>
                </Widget>
                <Widget>
                    <Widget.Header>
                        <h1>The social perception quiz!</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <p>Oksd aksdoak osda ksodk osdka, dsiji.</p>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GithubCorner projectUrl="https://github.com/leandrocl2005/imersao-next-alura-01-2021" />
        </QuizBackground>
    );
}
