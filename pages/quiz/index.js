import ReactLoading from 'react-loading';
import React,{useEffect} from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';


function ResultWidget({ results }) {
  useEffect(() => {
  const result =  results.filter((x) => x).length;
  alert(`Parabéns querido(a) usuário(a) por ter realizado a conclusão do quiz proposto para esse tópico tão importante dentro da Engenharia Química. O conhecimento é difundido apenas através do repasse ao próximo e com isso podemos crescer juntos, para que futuros usuários tenha uma fonte a se seguir compartilhe conosco a sua nota obtida e com isso teremos um ranking de usuários onde os que tiveram maior nota poderam ajudar o próximo, a sua nota foi dê: ${result} pontos. `)
  }, []);
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href='/'> Voltar para a página inicial</BackLinkArrow>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>{`Parabéns ,resposta correta, continue assim ${results.filter((x) => x).length} perguntas`}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Parabéns resposta, correta continue assim'
                : 'Resposta errada, sugiro estudar mais'}
            </li>
          ))}
        </ul>
      </Widget.Content>
      <div>
        <BackLinkArrow href='/' /> Voltar para a página inicial
      </div>
      <div>
       
       
       <iframe src="https://chat-912x6500w-rafaelfeliciano1.vercel.app/" style={{ width: '100%', height: 300, backgroundColor: 'silver'}}/>
       
       </div> 
    </Widget >
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>

      <Widget.Content>
        <ReactLoading
          type='spin'
          color="#fff"
          height={'150px'}
          width={'150px'}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {<div dangerouslySetInnerHTML={{ __html: question.description }} />}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
                style={
                  isSelected ?
                    { border: '1px solid #29b6f6aa' } :
                    null
                }
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {<div dangerouslySetInnerHTML={{ __html: alternative }} />}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
      
        </AlternativesForm>
      </Widget.Content>
   
  
      <div>
       
       
    <iframe src="https://chat-912x6500w-rafaelfeliciano1.vercel.app/" style={{ width: '100%', height: 300, backgroundColor: 'silver'}}/>
    
    </div> 

    </Widget>
  );
 
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
       {/* <QuizLogo /> */}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}