import Head from 'next/head';
import HomePage from '../components/component/tabs/homepage.component';
import { useAppContext } from '../context/AppContext';


export default function Home() {
  const { gameModeOne, setGameModeOne, testNumbers, setUser, user } = useAppContext();
  const handleOnchange = (event) => {
    setGameModeOne(!gameModeOne);
    /* remove focus */
    event.target.blur();
  };
  const handleOnchangeUser = (event) => {
    if(event.target.name === 'name'){
      setUser({
        ...user,
        name: event.target.value
      })
    }
    if(event.target.name === 'age'){
      setUser({
        ...user,
        age: event.target.value
      })
    }
  }
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
      <div className="container">
        {/* two input field for name and age */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              autoComplete='false'
              onChange={handleOnchangeUser}
              value={user.name}
              name="name"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
            />
            <span className="text-xs text-red-500">Name is required</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              autoComplete='false'
              name="age"
              onChange={handleOnchangeUser}
              value={user.age}
              id="age"
              className="border border-gray-300 p-2 rounded-md"
            />
            <span className="text-xs text-red-500">Age is required</span>
          </div>

        </div>
      </div>
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
