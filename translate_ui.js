const fs = require('fs');
const dict = {
    'Manage Exams': 'Manage_Exams',
    'Exams': 'Exams',
    'Create New Exam': 'Create_New_Exam',
    'ID': 'ID',
    'Exam Name': 'Exam_Name',
    'Status': 'Status',
    'Created By': 'Created_By',
    'Date Created': 'Date_Created',
    'Actions': 'Actions',
    'Assign Papers': 'Assign_Papers',
    'View Results': 'View_Results',
    'No exams found.': 'No_exams_found',
    'Cancel': 'Cancel',
    'Exam Details': 'Exam_Details',
    'Assign a New Paper': 'Assign_a_New_Paper',
    'Select Class': 'Select_Class',
    'Subject Name': 'Subject_Name',
    'Select Teacher': 'Select_Teacher',
    'Max Marks': 'Max_Marks',
    'Assign': 'Assign',
    'Assigned Papers': 'Assigned_Papers',
    'Teacher': 'Teacher',
    'Marks': 'Marks',
    'No papers assigned yet.': 'No_papers_assigned_yet',
    'My Exam Tasks': 'My_Exam_Tasks',
    'Exam': 'Exam',
    'Class': 'Class',
    'Subject': 'Subject',
    'Build Paper': 'Build_Paper',
    'Submit for Approval': 'Submit_for_Approval',
    'Mark Students': 'Mark_Students',
    'Current Status': 'Current_Status',
    'Questions': 'Questions',
    'Section': 'Section',
    'No questions added yet.': 'No_questions_added_yet',
    'Add New Question': 'Add_New_Question',
    'Question Text': 'Question_Text',
    'Add Question': 'Add_Question',
    'Paper Approvals': 'Paper_Approvals',
    'Approve': 'Approve',
    'Reject': 'Reject',
    'Mark Paper': 'Mark_Paper',
    'Students': 'Students',
    'Roll Number': 'Roll_Number',
    'Name': 'Name',
    'Obtained Marks': 'Obtained_Marks',
    'Total': 'Total',
    'Save Marks': 'Save_Marks',
    'Exam Results': 'Exam_Results',
    'Student ID': 'Student_ID',
    'View Report Card': 'View_Report_Card',
    'Student Report Card': 'Student_Report_Card',
    'Results': 'Results',
    'Paper / Subject': 'Paper_Subject',
    'Percentage': 'Percentage',
    'Grade': 'Grade',
    'Print Report Card': 'Print_Report_Card',
    'No students found.': 'No_students_found'
};

const files = ['list.ejs', 'assign.ejs', 'teacher_tasks.ejs', 'paper_builder.ejs', 'approvals.ejs', 'mark_paper.ejs', 'results.ejs', 'report_card.ejs'];

files.forEach(f => {
    let p = 'views/exams/' + f;
    let content = fs.readFileSync(p, 'utf8');
    for (const [eng, key] of Object.entries(dict)) {
        content = content.replace(new RegExp('>' + eng + '<', 'g'), '><%= __(\'' + key + '\') %><');
        content = content.replace(new RegExp('>\\s*' + eng + '\\s*<', 'g'), '>\n<%= __(\'' + key + '\') %>\n<');
        content = content.replace(new RegExp("title: '" + eng + "'", 'g'), "title: __('" + key + "')");
    }
    fs.writeFileSync(p, content);
});
console.log('UI files updated.');
