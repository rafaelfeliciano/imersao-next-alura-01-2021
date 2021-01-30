import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import Link from '../src/components/Link';


export default function Home() {
    const router = useRouter();
    const [name, setName] = useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>Tokyo rush - quiz</title>
            </Head>
            <QuizContainer>
                <QuizLogo />
                <Widget
                    as={motion.section}
                    variants={{
                        show: { opacity: 1, x: '0%' },
                        hidden: { opacity: 0, x: '-100%' }
                    }}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0, duration: 0.5 }}
                >
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

                <Widget
                    as={motion.section}
                    variants={{
                        show: { opacity: 1, x: '0%' },
                        hidden: { opacity: 0, x: '-100%' }
                    }}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Widget.Content>
                        <h1>Quizes da Galera</h1>

                        <ul>
                            {db.external.map((linkExterno) => {
                                const [projectName, githubUser] = linkExterno
                                    .replace(/\//g, '')
                                    .replace('https:', '')
                                    .replace('.vercel.app', '')
                                    .split('.');

                                return (
                                    <li key={linkExterno}>
                                        <Widget.Topic
                                            as={Link}
                                            href={`/quiz/${projectName}___${githubUser}`}
                                        >
                                            {`${githubUser}/${projectName}`}
                                        </Widget.Topic>
                                    </li>
                                );
                            })}
                        </ul>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GithubCorner projectUrl="https://github.com/leandrocl2005/imersao-next-alura-01-2021" />
        </QuizBackground>
    );
}
