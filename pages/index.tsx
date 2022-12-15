import HomePage from '../components/component/tabs/homepage.component';
import { useAppContext } from '../context/AppContext';


export default function Home() {
  const { gameModeOne, setGameModeOne } = useAppContext();
  const handleOnchange = (event) => {
    setGameModeOne(!gameModeOne);
    /* remove focus */
    event.target.blur();
  };

  return (
    <div className='grid place-items-center h-screen p-10 '>
      <button
        onClick={handleOnchange}
        className='absolute top-0 left-0 m-2 p-1 bg-green-500 rounded-md'
      >
        {
          gameModeOne ? "Level 2" : "Level 1"
        }
      </button>
      <HomePage />
    </div>
  )
}
