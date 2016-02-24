$(document).ready(function() {
  $('input[id="check_A"]').click(function() {
    if ($(this).is(':checked')) {
      $('.table_buttons').addClass('matrix_A');
      $('.table_buttons').removeClass('matrix_B');
    }
  });
  $('input[id="check_B"]').click(function() {
    if ($(this).is(':checked')) {
      $('.table_buttons').addClass('matrix_B');
      $('.table_buttons').removeClass('matrix_A');
    }
  });
  $('td').keydown(function() {
    $('.left').css('background-color', 'rgba(81, 147, 232, 1)');
    $('.cantMultiply').empty();
  });
  numberLimit();
  placeholder();
});

function check() {
  if ($('.table_buttons').hasClass('matrix_A')) {
    var tableClass = ('.table_A');
  } else if ($('.table_buttons').hasClass('matrix_B')) {
    var tableClass = ('.table_B');
  }
  return tableClass;
}

function addRow() {
  var $table = $(check());
  var $newRow = $('<tr></tr>');
  var $rowFirst = $table.find('tr:first');
  var rowLength = $rowFirst.find('td').length;
  var colLength = $table.find('tr').length;
  if (check() === '.table_A') {
    var mark = 'a';
  } else {
    var mark = 'b';
  }
  if (colLength < 10) {
    for (var i = 0; i < rowLength; i++) {
      var placeholderValue = mark + (colLength + 1) + ',' + (i + 1);
      $newRow.append('<td><input type="number" placeholder="' + placeholderValue + '"></td>');
    }
    $table.append($newRow);
    numberLimit();
    placeholder();
  }
}

function deleteRow() {
  var $table = $(check());
  var colLength = $table.find('tr').length;
  var $row = $table.find('tr:last');
  if (colLength > 2) {
    $row.remove();
  }
}

function addCol() {
  var $table = $(check());
  var $row = $table.find('tr');
  var $rowFirst = $table.find('tr:first');
  var rowLength = $rowFirst.find('td').length;
  if (check() === '.table_A') {
    var mark = 'a';
  } else {
    var mark = 'b';
  }
  if (rowLength < 10) {
    $row.each(function(i) {
      var placeholderValue = mark + (i + 1) + ',' + (rowLength + 1);
      var $col = $(this).append('<td><input type="number" placeholder="' + placeholderValue + '"></td>');
      numberLimit();
      placeholder();
    });
  }
}

function deleteCol() {
  var $table = $(check());
  var $row = $table.find('tr');
  var $cell = $row.find('td:last');
  var $rowFirst = $table.find('tr:first');
  var rowLength = $rowFirst.find('td').length;
  if (rowLength > 2) {
    $row.each(function() {
      $cell.remove();
    });
  }
}

function addMatrixC(a) {
  $('#matrix_C').empty();
  var conteiner = document.getElementById('matrix_C');
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  var rowsA = a.length;
  var colsA = a[0].length;
  for (i = 0; i < rowsA; i++) {
    var vals = a[i];
    var row = document.createElement('tr');
    for (var b = 0; b < colsA; b++) {
      var cell = document.createElement('td');
      cell.textContent = vals[b];
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  conteiner.appendChild(table);
}

function readMatrix(tableClass) {
  var $matrixA = $(tableClass);
  var $trs = $matrixA.find('tr');
  var A = [];
  $trs.each(function(i) {
    A.push([]);
    $(this).find('input').each(function() {
      var val = $(this).val();
      A[i].push(val);
    });
  });
  return A;
}

function canMultiply(A, B) {
  return A[0].length === B.length;
}

function multiplyMatrix() {
  var A = readMatrix('#container_A');
  var B = readMatrix('#container_B');
  if (!canMultiply(A, B)) {
    $(document).ready(function() {
      $('.left').css('background-color', 'rgba(245, 130, 130, 0.5)');
      $('.cantMultiply').append('<p>Такие матрицы нельзя перемножить,<br>так как количество столбцов матрицы А<br>не равно количеству строк матрицы B.<p>');
    });
    return;
  }
  var C = math.multiply(A, B);
  addMatrixC(C);
}

function clean() {
  $('input').val('');
}

function numberLimit() {
  $('input').keyup(function() {
    var value = this.value;
    var isNumber = !isNaN(value);
    if (isNumber) {
      if (value > 10) {
        value = 10;
      } else if (value < 0) {
        value = 0;
      };
    } else {
      value = '';
    }
    this.value = value;
  });
}

function change() {
  var $matrixA = $('#container_A table');
  var $matrixB = $('#container_B table');
  $('#container_A').append($matrixB);
  $('#container_B').prepend($matrixA);
  $matrixA.toggleClass('table_B');
  $matrixA.toggleClass('table_A');
  $matrixB.toggleClass('table_A');
  $matrixB.toggleClass('table_B');
}

function placeholder() {
  $('input, textarea').placeholder();
}
