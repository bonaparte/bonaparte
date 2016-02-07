window.addEventListener("load", function(){
    var summary = document.querySelector("ul.summary");
    
    var firstElement = summary.firstChild;

    var li = document.createElement('li');
    var link = document.createElement('a');
    link.innerHTML = "Bonaparte on Github";
    link.setAttribute('class', 'my-custom-link');
    link.setAttribute('href', 'http://github.com/bonaparte');
    link.setAttribute('target', '_blank');
    console.log(firstElement);
    
    
    
});

document.querySelector("title").innerHTML = "Bonaparte Documentation";