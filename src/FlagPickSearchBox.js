import React from 'react';

class FlagPickSearchBox extends React.Component {

   inputChange = (event) => {
       console.log(event.target.value);
       this.props.forChange(event);
   }
   
   render(){
       
      return (<div>
          <input
              type="text"
              name={this.props.entity}
              value={this.props.entityState}
              onChange={this.inputChange}
           />
           {this.props.children}
      </div>)
   }

}    

export default FlagPickSearchBox;