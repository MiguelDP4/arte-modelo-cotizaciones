// This file contains JavaScript code that handles the functionality for generating the PDF.

document.addEventListener('DOMContentLoaded', function() {
    const generatePdfButton = document.getElementById('generate-pdf');
    
    generatePdfButton.addEventListener('click', function() {
        const doc = new jsPDF();
        const element = document.getElementById('quotation');

        doc.html(element, {
            callback: function (doc) {
                doc.save('quotation.pdf');
            },
            x: 10,
            y: 10
        });
    });
});