import React from 'react';
import ReactDOM from 'react-dom';
import JSSoup from 'jssoup';


class HighlightArticle extends React.Component 
{

  constructor(props) {
    super(props);
    this.state = { selection: '' }
  }
/*
 * 1. props has the content.
 * 2. function highlight applies the highlighting if we have any
 * 3. if the user makes a selection, update the highlighting
 * 4. use function highlight in render.
 */

  
Highlight() 
{
  console.log("inside highlight")
  if(this.state.selection !== '')
    {
      console.log('if');
      const mainElement = this.props.content;
      //console.log(mainElement)
      const selection= this.state.selection;
      console.log(selection);
      const regex=RegExp(selection, 'g')
      const replacement = '<b>'+ selection+'</b>';
      console.log(replacement);

      const newHTML = mainElement.replace(regex, replacement);
      return newHTML;
      
    } else {
      console.log('else');
      return this.props.content;
    }
};

  handle_selection() {
    if (this.has_selection()) {
      this.setState({ selection: window.getSelection() })
    }
    else {
      this.setState({ selection: ''});
    }
  }

  
  has_selection() 
  {
    return (window.getSelection && !window.getSelection().isCollapsed);
  }

  

  render() 
  {
    return(
      
      <div onMouseUp={(e) => this.handle_selection() }>
        { this.Highlight(this.props.content) }
      </div>
    );
  }
};

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '', text: '' };
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
                
     <HighlightArticle content={this.state.text} />
        
        
      </>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));

