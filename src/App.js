import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/Home';
import AddTask from './view/AddTask';
import PendingTaskList from './view/PendingTaskList';
import CompleteTaskList from './view/CompleteTaskList';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add-task" exact component={AddTask} />
            <Route path="/pending-task" exact component={PendingTaskList} />
            <Route path="/complete-task" exact component={CompleteTaskList} />



              </Switch>
              </BrowserRouter>
    </div>
  );
}

export default App;
