$(document).ready(function(){
   fetchDocs();
});


function fetchDocs() {
    $.ajax({
        url: '/documento/loadAll',
        type: 'GET',
        success: function(response) {
            const docs = JSON.parse(response);
            let template = '';
            docs.forEach(doc => {
                template += `
                  <tr docId="${doc._id}">
                      <td>
                        <a href="/documento/load/${doc._id}" class="task-item">
                            ${doc.Titulo} 
                        </a>
                      </td>
                      <td>${doc.Version}</td>
                      <td>${Date(doc.Fecha).split(' ').slice(0, 4)}</td>
                  </tr>
                `
            });
            $('#misDocumentos').html(template);
        }
    });
}