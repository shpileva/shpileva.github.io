function check() {
  if ($('.table_buttons').hasClass('matrix_A')) {
    var tableID = ('matrix_A');
  } else if ($('.table_buttons').hasClass('matrix_B')) {
    var tableID = ('matrix_B');
  }
  return tableID;
}

function addRow() {
  var table = document.getElementById(check());
  var rowCount = table.rows.length;
  if (rowCount < 10) {
    var row = table.insertRow(rowCount);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      var cell = row.insertCell();
      var element = document.createElement('input');
      // element.type = "number";
      element.appendChild = ('type = number');
      cell.appendChild(element);
      numberLimit();
    }
  }
}

function deleteRow() {
  var table = document.getElementById(check());
  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

function addCol() {
  var table = document.getElementById(check());
  if (table.rows[0].cells.length < 10) {
    for (var i = 0; i < table.rows.length; i++) {
      var cell = table.rows[i].insertCell(-1);
      var element = document.createElement("input");
      element.type = "number";
      cell.appendChild(element);
      numberLimit()
    }
  }
}

function deleteCol() {
  var table = document.getElementById(check());
  if (table.rows[0].cells.length > 2) {
    for (var i = table.rows.length - 1; i >= 0; i--) {
      table.rows[i].deleteCell(-1);
    }
  }
}

$(document).ready(function() {
  $('input[id="check_A"]').click(function() {
    if ($(this).is(':checked')) {
      $('.table_buttons').addClass('matrix_A');
      $('.table_buttons').removeClass('matrix_B');
    }
  });
});
$(document).ready(function() {
  $('input[id="check_B"]').click(function() {
    if ($(this).is(':checked')) {
      $('.table_buttons').addClass('matrix_B');
      $('.table_buttons').removeClass('matrix_A');
    }
  });
});

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

function readMatrix(tableID) {
  var $matrixA = $(tableID);
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

// $(document).ready(function() {
//   $('input[id="change_matrix"]').click(function() {
//     if ($(this).is(':checked')) {
//       $('#matrix_A').removeClass('matrix');
//       $('#matrix_B').addClass('matrix');
//       $('#matrix_B').after($('#matrix_A'));
//       $('#caption').remove();
//       $('#matrix_A').append('<caption>A</caption>')
//         .css('font-size', '30px');
//       $('#matrix_A').css('caption-side', 'bottom');
//     }
//   });
// });

function multiplyMatrix() {
  // if ($('#change_matrix').is(':checked')) {
  //   var A = readMatrix('#matrix_B');
  //   var B = readMatrix('#matrix_A');
  // } else {
  var A = readMatrix('#matrix_A');
  var B = readMatrix('#matrix_B');
  // };
  if (!canMultiply(A, B)) {
    if ($('#change_matrix').is(':checked')) {
      $(document).ready(function() {
        $('.left').css('background-color', 'rgba(245, 130, 130, 0.5)');
        $('.cantMultiply').append('<p>Такие матрицы нельзя перемножить,<br>так как количество столбцов матрицы B<br>не равно количеству строк матрицы A.<p>');
      });
      return;
    } else {
      $(document).ready(function() {
        $('.left').css('background-color', 'rgba(245, 130, 130, 0.5)');
        $('.cantMultiply').append('<p>Такие матрицы нельзя перемножить,<br>так как количество столбцов матрицы А<br>не равно количеству строк матрицы B.<p>');
      });
      return;
    }
  }
  var C = math.multiply(A, B);
  addMatrixC(C);
}

$(document).ready(function() {
  $('td').keydown(function() {
    $('.left').css('background-color', 'rgba(81, 147, 232, 1)');
    $('.cantMultiply').empty();
  });
});

function clean() {
  $(document).ready(function() {
    $('input').val('');
  });
}
function numberLimit() {
  $('input').keyup(function() {
    var $value = this.value;
    if ($value > 10) {
      $value = 10;
    } else if ($value < 0) {
      $value = 0;
    };
    this.value = $value;
  });
}
// function change() {
//   var $A = readMatrix('#matrix_A');
//   var $B = readMatrix('#matrix_B');
//   $(document).ready(function() {
//     $('#matrix_A').replaceWith(readMatrix('#matrix_B'));
//   });
// }
