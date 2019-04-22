// JQuery Mobile


$(document).on("mobileinit", function(){

	$(function(){
			
			$("#main").on("pageinit", function(){
			//$("#getweather").click(function(){
				var lat;
				var long;
				var city = "madrid";
				var key = '314d0dcc8fd61af30f18e7a1a5e359f0';

				navigator.geolocation.getCurrentPosition(successF, errorF);
				function successF(position) {
					lat = position.coords.latitude;
					long = position.coords.longitude;
					//alert('Your latitude is :'+lat+' and longitude is '+long);
					$.ajax({
						url:'http://api.openweathermap.org/data/2.5/weather',
						dataType:'json',
						type:'GET',
						data:{ lat: lat, lon: long, appid: key, units: 'metric'},

						success: function(data){
							var wf = '';
							$.each(data.weather, function(index,val){
								wf +='<p><b>' + data.name + "</b><img scr="+ val.icon + ".png></p>"+
								data.main.temp + '&deg;C ' + ' | ' + val.main + ", " +
								val.description
								
								console.log(data);
	 						});
	 						$("#showweather").html(wf);
						}

					});

					//añadir de forma dinámica 
					/*var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+key+'&units=metric';
					$.getJSON(url)
					.done(function(response){
						$.each(response, function(){
								console.log(response);
	 					});
					});*/
				}
				function errorF(position){
					alert('Error!');
				}	
			}); 

		$("#busca").on("pageinit", function(){
		
			$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
		        var $ul = $( this ),
		            $input = $( data.input ),
		            value = $input.val(),
		            html = "";
		        $ul.html( "" );
		        if ( value && value.length > 2 ) {
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: "http://gd.geobytes.com/AutoCompleteCity",
		                dataType: "jsonp",
		                crossDomain: true,
		                data: {
		                    q: $input.val()
		                }
		            })
		            .then( function ( response ) {
		                $.each( response, function ( i, val ) {
		                    html += "<li><a href ='#'>" + val + "</a></li>";
		                });
		                $ul.html( html );
		                $ul.listview( "refresh" );
		                $ul.trigger( "updatelayout");
		            });
		        }
		    });

			//añadir ciudad en la lista de ciudades (hay que mirar cómo hacerlo)

					$('ul').on('click', 'li', function() {
						$("ul").append( $("") );
					});

		});
		
	});

});





/*$.getJSON("https://reqres.in/api/users", function(resp){

		let users = resp.data;

		$.each(users, function(index, item){
		$("#userList").append("<li>" + users[index].first_name + "<li>")
		});


		/*$("#userList").children().sort(function(a, b){
		return $(a).text() >$(b).text();
		}).appendTo("#userList");
		$('#userList').listview('refresh');*/