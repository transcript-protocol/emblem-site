const assert = require('assert')
const fs = require('fs')

const transcriptParsingUtil = require('../../utils/transcript.parsing.util')

describe('Transcript Parsing Util', function() {
  const testPdf1Buffer = fs.readFileSync('./test/files/test_transcript1.pdf')
  const testPdf2Buffer = fs.readFileSync('./test/files/test_transcript2.pdf')

  describe('#getPdfInfo', function() {
    it('should return all relevant student information and the full raw text', function() {
      transcriptParsingUtil.getPdfInfo(testPdf1Buffer).then(data => {
        const { lastYearInSchool, firstName, lastName, middleName, dateOfBirth, joinedText } = data
        assert.equal(lastYearInSchool, '2018')
        assert.equal(firstName, 'ANNA')
        assert.equal(lastName, 'CUDDEBACK')
        assert.equal(middleName, '')
        assert.equal(dateOfBirth, '10/04/1999')
      })
    })
  })
})
