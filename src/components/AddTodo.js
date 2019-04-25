import React, { Component } from 'react'

export class AddTodo extends Component {

    onchange = (e) => this.setState({ [e.target.name]: [e.target.value] });
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
         
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input name="title" type="text" placeholder="Add Todos" style={{ flex: '10', height: '50px' }} onChange={this.onchange} />
                <input type="submit" value="Submit" className="btn" style={{ flex: '1', height: '50px' }} onChange={this.onchange} />
            </form>
        )
    }
}

export default AddTodo
