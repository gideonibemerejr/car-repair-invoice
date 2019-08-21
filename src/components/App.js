import React, { Component } from 'react';
import './App.module.scss';
import Invoice from './Invoice'

class App extends Component {
  state = { 
    invoices: 0
   }
  render() { 
    return ( 
      <div className="App">
        <Invoice numberOfInvoices={this.state.invoices + 1}/>
      </div>
     );
  }
}
 
export default App;

