import styled from 'styled-components'
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [name, setName] = useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>AluraQuiz - Modelo base</title>
            </Head>
            <QuizContainer>
                <QuizLogo />
                <Widget>
                    <Widget.Header>
                        <h1>Tokyo Rush!</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <form
                            autoComplete="off"
                            onSubmit={event => {
                                event.preventDefault();
                                router.push(`/quiz?name=${name}`);
                            }}
                        >
                            <Input
                                name='nomeDoUsuario'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Diz aí seu nome..."
                            />
                            <Button
                                type="submit"
                                disabled={name === ''}
                            >
                                Jogar
                            </Button>
                        </form>
                    </Widget.Content>
                </Widget>

                <Widget>
                    <Widget.Content>
                        <h1>Quizes da Galera</h1>

                        <p>lorem ipsum dolor sit amet...</p>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GithubCorner projectUrl="https://github.com/leandrocl2005/imersao-next-alura-01-2021" />
        </QuizBackground>
    );
}
