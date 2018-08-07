/** 
 Property of Emblem
 Written by Maria Galebach 
 7/11/18
**/


/*
Takes a pdf input and turns it into a url  
*/
window.URL = window.URL || window.webkitURL;

var fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");



function handleFiles(files) {
    console.log('FILES ', files);
    if (!files.length) {
        fileList.innerHTML = "<h1>Choose Transcript</h1>"
    } else {

        document.getElementById("fileElem").innerHTML = "Success!"

        var img = document.createElement("img"); 
        img.src = window.URL.createObjectURL(files[0]); 
        img.height = 60; 

        var username = document.getElementById("username").value
        var studentUsername = document.getElementById("studentUsername").value
        var schoolID = document.getElementById("schoolID").value

         
        getContent(img.src).then(fileText => console.log(createUpload(username, studentUsername, schoolID, fileText)))



    }
}

/**
 * Returns the data
 */
function getContent(pdfUrl) {
    return PDFJS.getDocument(pdfUrl)
        .then(pdf => pdf.getPage(1)) // pages start at 1
        .then(page => page.getTextContent())
        .then(joinTextData)
        .then(data => {
            var pdfText = String(data)
            console.log("Pdf text INSIDE of getContent: " + pdfText)
            return pdfText
        })
        .catch(function(err) {
            console.log('Get Text Error: ', err)
        })
}


/*
Parses the data from the shitshow of a datastructure
*/
function joinTextData(textData) {
    // data structure of textData is {items: [
    // 	{
    // 		str: *TEXT*
    // 	}
    // ]}
    return textData.items.map(item => item.str).join(' ')
}