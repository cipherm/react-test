import { GlobalStyle } from "../styles/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {

  const { Component, pageProps } = props;

  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Component { ...pageProps }/>
    </>
  )


}

export default App;