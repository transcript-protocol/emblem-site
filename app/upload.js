/*
Maria Galebach
7/24/18
Property of EmblemEDU
Extracts info from form
*/

class Transcript {
    constructor(pdfText, username, studentUsername, schoolID) {
        this.pdfText = pdfText
        this.username = username
        this.studentUsername = studentUsername
        this.schoolID = schoolID
        
    }
}

function createTranscript(pdfText, username, studentUsername, schoolID) {
    upload = new Transcript(pdfText, username, studentUsername, schoolID)
    console.log(upload)
    return upload
}