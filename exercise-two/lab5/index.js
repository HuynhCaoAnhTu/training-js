  //  function insert_Row()
  //   {
  //     var currentRow_num = document.getElementsByTagName('tr').length
  //     var table= document.getElementById('sampleTable');
  //     table.insert_Row(0)
  //     var newRow= document.createElement('tr');
  //     table.appendChild(newRow)
  //     var newcell1= document.createElement('td');
  //     newcell1.innerHTML = `Row ${currentRow + 1} cell1`;
  //     var newcell2= document.createElement('td');
  //     newcell2.innerHTML = `Row ${currentRow + 1} cell2`;
  //     newRow.appendChild(newcell1)
  //     newRow.appendChild(newcell2)
  //   }
  function insert_Row() {
    var table = document.getElementById("sampleTable").insertRow(0);
    var y = table.insertCell(0);
    var z = table.insertCell(1);
    y.innerHTML = "New Cell1";
    z.innerHTML = "New Cell2";
  }