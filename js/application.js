
$(document).ready(function(){
  updatePrice();

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePrice();
    }, 1000);
  });

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updatePrice();
  });

  $('#addProduct').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var cost = $(this).children('[name=cost]').val();
    var qty = $(this).children('[name=qty]').val();

    $('tbody').append('<tr>' +
      '<td class="name">' + name + '</td>' +
      '<td class="cost"><input type="number" value="' + cost + '" /></td>' +
      '<td class="qty"><input type="number" value="' + qty + '"/></td>' +
      '<td class="price"></td>' +
      '<td><button class="btn btn-danger btn-sm remove">Remove Product</button></td>' +
    '</tr>');

    updatePrice();
    $(this).children('[name=name]').val('');
    $(this).children('[name=cost]').val('');
    $(this).children('[name=qty]').val('');
  });
});

var sum = function (total, num) {
  return total + num;
}

var updatePrice = function () {
  var productPrice = [];
  var price = $('tbody tr').each(function (i, ele) {
    var productCost = parseFloat($(ele).find('.cost input').val());
    var productQty = parseFloat($(ele).find('.qty input').val());
    var price = productCost * productQty;
    $(ele).children('.price').html('$'+ price);
    productPrice.push(price);
    });
  var totalPrice = productPrice.reduce(sum);
  $('#totalPrice').html(totalPrice);
};
