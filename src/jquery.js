const searchBar= document.getElementById("searchBar");

console.log(searchBar);
searchBar.addEventListener("keyup" ,(e) => {
    console.log(e.target.value);
});

function selectHTML() 
{
    try 
    {   
        
        
        console.log(getSelection().getRangeAt(0));
        var nNd = document.createElement("span");
        nNd.setAttribute("class","spanText")

        var w = getSelection().getRangeAt(0);
        w.surroundContents(nNd);
        return true;
    } catch (e) 
    {
 	    return false;
    }
}

function clearHighlight()
{
    var str= document.getElementById("p1")
    var elementsClear = document.getElementsByClassName("spanText");
    const max=elementsClear.length;
    for(var i = 0; i < max; i++)
    {
		elementsClear[0].replaceWith(elementsClear[0].innerHTML);
	}
    

}

// Set up event handler - clicking on the changeColor button
$(function() 
{
    $('#changeColor').click( function() 
    {
        selectHTML();
        var elements = document.getElementsByClassName("spanText");
	    for(var i = 0; i < elements.length; i++)
        {
		    elements[i].style.backgroundColor = "yellow";
	    }

        var wordsHighlighted=0;
        wordsHighlighted=elements.length;
        document.getElementById("highlightCounter").innerHTML=wordsHighlighted;
    });

	  $('#clear').click( function() {
      clearHighlight();
      document.getElementById("highlightCounter").innerHTML=0;
      var elements = document.getElementsByClassName("spanText"); 
	  
      $(".spanText").remove();

    });
});
