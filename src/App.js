import React, { Component } from 'react';
import Todos from './components/Todos';
import "./App.css"
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import uuid from 'uuid'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: "work on kubernetes",
        completed: false
      }
    ]

  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(console.log("success"));
  }

  markComplete = (id) => {
    console.log("from app.js");
    console.log("id" + id);
    this.setState({
      todos: this.state.todos.map(
        todo => {
          if (id === todo.id) {
            todo.completed = !todo.completed
          }
          return todo;
        }

      )

    });
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id != id)]
    }));
  }

  addTodo = (t) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: t, completed: false
    }).then(res => {this.setState({todos: [...this.state.todos, res.data]})})

    // const newTodo = {
    //   id: uuid.v4(),
    //   title: t,
    //   completed: false

    // }
    // this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
