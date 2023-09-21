function createTable()
{
row_num = window.prompt("Input number of rows", 1);
col_num = window.prompt("Input number of columns",1);
  
 for(var x=0;x<parseInt(row_num,10);x++)
  {
   var table =document.getElementById('myTable').insertRow(x);
   for(var y=0;y<parseInt(col_num,10);y++)  
    {
     var cell=  table.insertCell(y);
     cell.innerHTML="Row-"+x+" Column-"+y; 
    }
   }
}
