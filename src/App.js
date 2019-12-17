import React from 'react';
import FlagPickSearchForm from './FlagPickSearchForm';

class App extends React.Component{
    

    onFormSubmit = (formValues) => {
      console.log(formValues);
    }

    render(){
        return (
          <div className="ui container" style={{ marginTop: '5px' }}>
            <FlagPickSearchForm onSubmit={this.onFormSubmit} />
          </div> 
        )
    }
}

export default App;