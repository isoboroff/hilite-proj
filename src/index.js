import React from 'react';
import ReactDOM from 'react-dom';
import JSSoup from 'jssoup';


class HighlightArticle extends React.Component 
{
  /* this.props.content: the text for highlighting */
  constructor(props) {
    super(props);
    this.state = { hilite_start: 0, 
                   hilite_end: 0,
                   content: this.props.content,
                 };
    console.log("In Constructor")
    console.log(this.props)
  }


Highlight() 
{
  console.log("inside highlight")
    if(this.has_selection)
    {
    const mainElement = this.state.content;
    console.log(mainElement)
    let selection=window.getSelection().toString();
    var regex=RegExp(selection, 'g')
    var replacement = '<b>'+ selection+'</b>';
    var newHTML = mainElement.replace(regex, replacement);
    this.setState({content: newHTML});
    console.log("inside of if")
    }
    console.log("outside of if")
  };


  
  has_selection() 
  {
    return (window.getSelection && !window.getSelection().isCollapsed);
  }

  

  render() 
  {
    //console.log({this.state.content})
      //<div onMouseUp={(e)=>{this.Highlight()}}>
      //</div>

    return(
      <div onMouseUp={(e)=>{this.Highlight()}}>
       {this.state.content}
      </div>
    );
  }
};

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
    //console.log(the_div);
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
      //.then(text => { console.log(text); return text })
      .then(ptext => this.setState({ text: ptext }));
  };

  

  myChangeHandler = event => {
    this.setState({ url: event.target.value });
  };
  render() {
    //<HighlightArticle content={this.state.text} />

          

    return (
      <>
      <form onSubmit={this.mySubmitHandler}>
          <h1>Display webpage</h1>
          <p>Enter the url, and submit:</p>
          <input type="text" onChange={this.myChangeHandler} />
          <input type="submit" value="submit" />
          <input id="changeColor" type="button" value="Highlight"/>
          <input id="clear" type="button" value="Clear"/>
        </form>
        <div>the url is {this.state.url}</div>
        <div>the text is<p/> this.text </div>
        {console.log(this.state.text)}
        <HighlightArticle content= {new HighlightArticle(this.state.text)} />
        
        
      </>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));
