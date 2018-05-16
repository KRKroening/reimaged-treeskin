QUnit.module('LoadSubjectListGroupOne')

QUnit.test('Loads a subject list', function (assert) {
    //QUnit.expect(1)

    var expectedResult = `
                        <tr><td> TestName </td>
                        <td> 13 </td>
                        <td> G </td>
                        <td> TestBreed </td>
                        <td> TestColour </td>
                        <td><label class='iconHover' onclick='window.location.href = "subjects_edit.html?mode=test ";'>Edit</label> | <label  class='iconHover' onclick="deleteSub(this)">Delete</label></td>
                        </tr>
                    `

    var testData = [{
        'name' : 'TestName',
        'age': 13,
        'gender': 'G',
        'colour' : 'TestColour' 
       },
       {
        'name' : 'TestName2',
        'age': 13,
        'gender': 'T',
        'colour' : 'TestColour2' 
       }
    ]

    assert.equal(
        SubjectList.loadSubjectTable(testData),
        $("#subjectTableBody").append(expectedResult),
        "Table generated"
    )
})

QUnit.test('Test math', function (assert) {
    //QUnit.expect(1)

    var expectedResult = 6

    var a = 1
    var b = 2
    var c = 3

    assert.equal(
        SubjectList.testMath(a,b,c),
        expectedResult,
        "Test amth"
    )
})