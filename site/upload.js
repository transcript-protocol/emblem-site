/*
Maria Galebach
7/24/18
Property of EmblemEDU
Extracts info from form
*/

class Upload {
    constructor(username, studentUsername, schoolID, pdfText) {
        this.username = username
        this.studentUsername = studentUsername
        this.schoolID = schoolID
        this.pdfText = pdfText

    }
}

function createUpload(username, studentUsername, schoolID, pdfText) {
    return new Upload(username, studentUsername, schoolID, pdfText)
}


function onClick() {
    var username = document.getElementById("username").value
    var studentUsername = document.getElementById("studentUsername").value
    var schoolID = document.getElementById("schoolID").value

    var transcript = document.getElementById("fileElem").files[0]
    console.log(transcript)

    var img = document.createElement("img") 
    img.src = window.URL.createObjectURL(transcript) 
    console.log(img.src)

    PDFJS.getDocument(img.src)
        .then(pdf => pdf.getPage(1)) // pages start at 1
        .then(page => {
            page.getTextContent()
        })
        .then(joinTextData)
        .then(data => {
            console.log("PDF TEXT: " + data)
            return data
                // var upload = createUpload(username, studentUsername, schoolID, data)
                // console.log(upload)
        })
        .catch(function(err) {
            console.log('Get Text Error: ', err)
        })
}