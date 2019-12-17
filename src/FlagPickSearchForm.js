import React from 'react';
import FlagPickSearchBox from './FlagPickSearchBox';
import {Checkbox, Card, Image } from 'semantic-ui-react';
import './FlagPickSearchForm.css';

class FlagPickSearchForm extends React.Component {
  constructor(props){
      super(props);
      this.continentList = ['Asia','Africa','North America','South America'];
      this.countryList = [{name:"India", value:"Asia",defaultChecked:false},
                          {name:"Japan", value:"Asia",defaultChecked:false},
                          {name:"Luanda", value:"Africa",defaultChecked:false},
                          {name:"USA", value:"North America",defaultChecked:false},
                          {name:"Brazil", value:"South America",defaultChecked:false},
                          {name:"Argentina", value:"South America",defaultChecked:false},
                          {name:"South-Korea", value:"Asia",defaultChecked:false},
                          {name:"China", value:"Asia",defaultChecked:false}];
      this.tempCountryArray=[];                    

  }  
  state = { continent: '',
            country:[], 
            continentSuggestions:[],
            countrySuggestions:[]
          };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };
  //country selection
  selectedCountrySuggestion = (country) =>{
    this.setState({country});
  }
  // continent selection
  selectedContinentSuggestion = (continent) =>{
    console.log(continent);
      this.setState({country:[],continent,continentSuggestions:[]});
      this.tempCountryArray = [];
  }

  onCheckboxSelect =(label) =>{
    this.tempCountryArray = [...this.tempCountryArray,label];
    this.setState({country:this.tempCountryArray,countrySuggestions:[]});
   
  }

  onCheckboxDeselect =(label) =>{
    this.tempCountryArray = [...this.tempCountryArray].filter(country => country !== label );
    this.setState({country:this.tempCountryArray,countrySuggestions:[]});
}

  onCheckboxChange = (event,data) => {
    console.log(data);
   
    data.checked === true?this.onCheckboxSelect(data.label):this.onCheckboxDeselect(data.label);
    this.countryList.forEach(c =>{
        if(c.name === data.label){
          c.defaultChecked = data.checked;
          console.log("done");
        }
    });
  }



  setContinent =(event) =>{
    let suggestions = [];  
    console.log(event.target.name);
    console.log(event.target.value);
    const regex = new RegExp(`^${event.target.value}`,'i');
     
    suggestions = this.continentList.map((continent,index) => {
           
        return (regex.test(continent)?(<li onClick={()=>this.selectedContinentSuggestion(continent)} key={index}>{continent}</li>):null);
        
    });
    this.setState({continentSuggestions:suggestions, [event.target.name]:event.target.value,country:[],countrySuggestions:[]});
  }

  setCountry =(event) =>{
    if(this.state.continent){
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(this.state.countrySuggestions);
        let suggestions = [];
        const regex = new RegExp(`^${event.target.value}`,'i');
        
        const countryListPerContinent = this.state.continent?this.countryList.filter((country) => {
            return country.value === this.state.continent
        }):[];
        suggestions = countryListPerContinent.map((country,index) => {
   
         //   return (regex.test(country.name)?(<li onClick={()=>this.selectedCountrySuggestion([country.name])} key={index}>{country.name}</li>):null);
 return (regex.test(country.name)?(<li key={index} ><Checkbox onChange={this.onCheckboxChange}  checked={country.defaultChecked} label={country.name} /></li>):null);
            
        });
        console.log(suggestions);
        this.setState({countrySuggestions:suggestions,[event.target.name]:event.target.value});

    }
  }



  onContinentCountryChange = event => {
    
     event.target.name === 'continent'&& event.target.value.length>-1?this.setContinent(event):this.setCountry(event);
        
  }


  
  render() {
      
    
    const listOfCountries = this.countryList.map((country) =>{
       return country.name;
    });
    console.log(this.state.country);
    const selectedCountries = (this.state.country.length>0 && Array.isArray(this.state.country))?
        this.state.country.map((c,index) => {
         
          console.log(c);
          return (<Card key={index} >
                      <Card.Content>
                          <Image size='large' src={require(`./images/${c}.png`)} />
                      </Card.Content>
                  </Card>
                 );
    }):[];
   
    
   
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field suggestions">
            <label> Continent </label>
            <FlagPickSearchBox  forChange={this.onContinentCountryChange} entity="continent" entityState={this.state.continent}>
               <ul>
                 {this.state.continentSuggestions}
               </ul>
            </FlagPickSearchBox>
           
          </div>
          <div className="field suggestions">
            <label> Country </label>
            <FlagPickSearchBox forChange={this.onContinentCountryChange} entity="country" entityState={this.state.country}>
               <ul>
                 {this.state.countrySuggestions}
               </ul>
            </FlagPickSearchBox>
           
          </div>
          <Card.Group>
            { selectedCountries }
          </Card.Group>   
        </form>
        
      </div>
    );
  }
}

export default FlagPickSearchForm;