import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/Home';
import AddTask from './view/AddTask';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add-task" exact component={AddTask} />

              </Switch>
              </BrowserRouter>
    </div>
  );
}

export default App;
