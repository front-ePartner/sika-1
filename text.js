$(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
    valores ();

});
    function valores () {
    var valor = $( ".summary-totalizers .monetary" ).first().text().replace(/\./g, "").replace("$","")
    console.log(valor);
    var valorN = parseInt(valor)
    if(valorN < 500000){
      $(".btn-place-order-wrapper").css("display","none");
      $(".header-checkout").append("<div class='nopasar'><div class='ontenerc'><p><span>Tu pedido no alcanza el minimo de transacción el cual está en 500.000 COP</span><a href='/'>Escogue más productos aquí</a></p></div></div>")
    }else{$(".btn-place-order-wrapper").css("display","block")}
}

$(window).on('load', function(){
    valores ();
  vtexjs.checkout.getOrderForm()
  .done(function(orderForm) {
  var client = (orderForm.clientProfileData);
  var email = (orderForm.clientProfileData.email);
  var valueC = (orderForm.value).replace("00","");
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/api/dataentities/CL/search?_fields=email%2CfirstName%2Cdocument%2Cfactura&email="+email,
    "method": "GET",
    "headers": {
      "x-vtex-api-apptoken": "QZBIWMBANMXXIZJVAYTXHZOCEWRKJNDFBFUWIMJCQCEBVEPFYHSOXETQKZEZVQQAIRVDFMMNPQGFUNHAGMMCVPHXLDLJIKHALESDIMZLUEZGXOWXRDTIEOFTJYRCACEF",
      "x-vtex-api-appkey": "vtexappkey-pepeganga-MOQMOW",
      "cache-control": "no-cache",
      "postman-token": "002b9e97-9361-e1ca-7967-81e773d1ddf6"
    }
  }
  
  $.ajax(settings).done(function (response) {
    var factura = (response[0].factura);
    //var factura1 = []; factura1.push(factura);var factura2 = JSON.parse(factura);
  var json = typeof(factura);
  if(json == "string"){
    factura = JSON.parse(response[0].factura);
  }else{factura = (response[0].factura)};
  var saldoCupo = (factura.saldo_cupo);
  if(saldoCupo < valueC){
    $(".header-checkout").append("<div class='nopasar'><div class='ontenerc'><p><span>Tu cupo no alcanza para está transacción paga tus facturas Vencidas por favor ponte al día en el siguiente link</span><a href='https://digitalepartner.com/PagosStilotex/formulario.html'>Paga tus facturas aquí</a></p></div></div>")
    }else{console.log("cupo aprobado")};
  if(saldoCupo <= 0){
    $(".header-checkout").append("<div class='nopasar'><div class='ontenerc'><p><span>Tienes Facturas Vencidas por favor ponte al día en el siguiente link</span><a href='https://digitalepartner.com/PagosStilotex/formulario.html'>Paga tus facturas aquí</a></p></div></div>")
  }else{console.log("cupo aprobado")}
  });
  });
    });