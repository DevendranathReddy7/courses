import {Switch, Route} from 'react-router-dom'

import './App.css'
import Main from './components/main'
import Header from './components/Header'
import Details from './components/Details'
import Not from './components/Not'

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/courses/:id" component={Details} />
      <Route component={Not} />
    </Switch>
  </div>
)
export default App
