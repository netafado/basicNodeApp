function openPDF(docDefinition){
    pdfMake.createPdf(docDefinition).download('optionalName.pdf');
}