const Emblem = artifacts.require("Emblem");

contract('Emblem', function(accounts) {
    it("should assert true", function(done) {
        const emblem = Emblem.deployed();
        assert.isTrue(true);
        done(); // stops tests at this point
    });
});

contract('Emblem', function(accounts) {
    it("Should initialize correctly", function(done) {
        const emblem = Emblem.deployed();

        const transcriptHashHex = '9661c20e0102dfa24be0febd7122793b457a4948749d2a4a216fc1aa32ec560f'
        const transcriptHashBuffer = Buffer.from(transcriptHashHex, 'hex')
        const signatureBuffer = Buffer.from('f', 'hex')
        const highSchool = 'Medford High School'

        Emblem.new({ from: accounts[0] }).then(function(emblem) {
            emblem.transcripts.call(transcriptHashBuffer)
                .then(function(nullTranscript) {
                    assert.equal(nullTranscript, undefined, 'The transcript does not exist yet');
                })
                .then(function() {
                    return emblem.addTranscript.call(transcriptHashBuffer, signatureBuffer, highSchool);
                })
                .then( function() {
                    return emblem.transcripts.call(transcriptHashBuffer)
                })
                .then( function(transcript) {
                    assert.equal(transcript.transcriptHash, transcriptHashBuffer, 'Transcript hash was retrieved');
                }).catch(done);
        }).catch(done);
    });
});
