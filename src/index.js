import ReactDOM from 'react-dom';

const App = () => (
  <h1 style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }}>Welcome to Webpack React Starter Kit</h1>
);

ReactDOM.render(<App />, document.getElementById('root'));