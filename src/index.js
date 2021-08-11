import React from 'react';
import ReactDOM from 'react-dom';
import JSSoup from 'jssoup';


class HighlightArticle extends React.Component 
{

  constructor(props) {
    super(props);
    this.state = { selection: '' ,
                   mainText: ''}
  }
/*
 * 1. props has the content.
 * 2. function highlight applies the highlighting if we have any
 * 3. if the user makes a selection, update the highlighting
 * 4. use function highlight in render.
 */

Highlight()
{
  const selection = this.state.selection;
  const start =  this.props.content.search(selection)
  //console.log(start)
  const prefix = this.props.content.substring(0, start)
  //console.log(selection.toString())
  const hilite = this.props.content.substring(start, start+ selection.toString().length)
  //console.log(start+selection.length)
  const suffix = this.props.content.substring(start+selection.toString().length)
  //console.log(suffix)
  return (<> {prefix} <b> {hilite} </b> {suffix}</>);
}

/*
Highlight() 
{
  console.log("inside highlight")
  if(this.state.selection !== '')
  {

    
      console.log('if');
      const textBody = this.props.content;
      const selection= this.state.selection;
      console.log(selection);
      const replacement = '<b>'+ selection+'</b>';
      console.log(replacement);

      const newHTML = textBody.replace(selection, replacement);
      return newHTML;
      
    } else {
      console.log('else');
      return this.props.content;
    }
};
*/
  handle_selection() 
  {
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
          <input id="clear" type="button" value="Clear" />
     </form>
                
     <HighlightArticle content={this.state.text} />
        
        
      </>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));

