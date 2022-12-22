import Head from 'next/head';
import HomePage from '../components/component/tabs/homepage.component';
import { useAppContext } from '../context/AppContext';


export default function Home() {
  const { gameModeOne, setGameModeOne, testNumbers } = useAppContext();
  const handleOnchange = (event) => {
    setGameModeOne(!gameModeOne);
    /* remove focus */
    event.target.blur();
  };

  return (
    <div className='grid place-items-center h-screen p-2 max-w-screen-2xl mx-auto '>
      <Head >
        <title>Game</title>
        <meta name="description" content="Game" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <button
        onClick={handleOnchange}
        className='  top-0 left-0 m-2 p-1 bg-green-500 rounded-md'
      >
        {
          gameModeOne ? "Level 2" : "Level 1"
        }
      </button>
      <div>
        {
          gameModeOne ? <h2 id='doubleReactionTestScore'>{
            testNumbers.doubleReactionTest
          }</h2> : <h2 id='simpleReactionTestScore'>{
            testNumbers.simpleReactionTest
          }</h2>
        }
      </div>

      <HomePage />
    </div>
  )
}
