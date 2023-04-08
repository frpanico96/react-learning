import '@/styles/globals.css'
/* Import Apps */
import ProductApp from './apps/_product-app';
import Game from './apps/_tic-tac-toe';

export default function App()
{
  const isProductApp = true;
  const isTicTacToe = false;

  if(isProductApp)
  {
    return(<ProductApp/>)
  }
  else if(isTicTacToe)
  {
    return(<Game/>)
  }

}

