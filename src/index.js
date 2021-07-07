import React from 'react';
import ReactDOM from 'react-dom';
import JSSoup from 'jssoup';


class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '', text: '' };
  }

  processText(result) {
    let a = new DOMParser().parseFromString(result, 'text/html').documentElement
      .textContent;
    return a;
  }

  stripHtml(html)
  {
    let soup = new JSSoup(html);
    let the_div = soup.find('div', 'Article');
    console.log(the_div);
    if (the_div) {
      return the_div.getText();
    } else {
      return '... none ...';
    }
  }

  mySubmitHandler = event => 
  {
    event.preventDefault();
    fetch(this.state.url, {
      
    })
      .then(res => res.text())
      .then(res2=>this.stripHtml(res2))
      .then(text => { console.log(text); return text })
      .then(ptext => this.setState({ text: ptext }));
  };

  

  myChangeHandler = event => {
    this.setState({ url: event.target.value });
  };
  render() {
    return (
      <>
        <form onSubmit={this.mySubmitHandler}>
          <h1>Display webpage</h1>
          <p>Enter the url, and submit:</p>
          <input type="text" onChange={this.myChangeHandler} />
          <input type="submit" value="click me" />
        </form>
        <div>the url is {this.state.url}</div>
        <div>the text is<p/> this.text </div>
       {this.state.text} 
        
      </>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));
