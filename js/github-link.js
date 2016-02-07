window.addEventListener("load", function(){
    var link = document.querySelector("a.custom-link");
    link.innerHTML = "Visit Bonaparte on Github";
    link.setAttribute('style', 'text-indent:0;');
    link.setAttribute('href', 'http://github.com/bonaparte');
});

document.querySelector("title").innerHTML = "Bonaparte Documentation";