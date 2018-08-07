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