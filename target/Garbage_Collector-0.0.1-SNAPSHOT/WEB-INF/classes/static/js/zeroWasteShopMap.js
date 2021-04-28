 $(document).ready(function(){
  	
  		// index.html <div id='body'>에 맵이 들어갈 <div> 추가
  		var mapDiv = '<div id="map" style="width: 100%; height: 800px;"></div>';
  		$('#body').html(mapDiv);
  		
  		// 맵 <div>에 맵을 표시 
	 	var map = new naver.maps.Map(document.getElementById('map'), {
			    zoom: 13,
			    mapTypeId: 'normal',
			    zoomControl: true,
        		zoomControlOptions: {
            		style: naver.maps.ZoomControlStyle.SMALL,
            		position: naver.maps.Position.RIGHT_TOP
            		},
			    center: new naver.maps.LatLng(37.5666805, 126.9784147)
			});	
		// 사용자의 현재 위치를 얻은 후 이를 맵의 중심으로 설정		
	    /*if (navigator.geolocation) {
	        
	        navigator.geolocation.getCurrentPosition(function(position){
	        	var userCurrentLocation = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
	        	
	        	map.setCenter(userCurrentLocation);
	        	map.setZoom(17);
	        }, function(error){
	        	alert('에러메세지: ' + error.message);
	        }, {
	        	enableHighAccuracy : true, 
	        	maximumAge : 0, 
	        	timeout : 3000 
	        });
	        
	    } else {
	    	alert("geolocation을 지원하지 않음");
	        
	    }*/
	    
	    // 서버로 쓰레기통 위치 데이터 요청을 하고, 이를 받아 latlngs 배열에 추가 
  		var latlngs = [];
  		var zeroWasteShop = [];
  		var addressArr = [];
  		var nameArr = [];
  		var cdayArr = [];
  		var contactArr = [];
  		var markers = [];
  		var infoWindows = [];
  		$.post('../showZeroWasteShop.do', 
  				{}, 
  				function(data, status){
  					var object = JSON.parse(data);
  					zeroWasteShop = object.zeroWasteShopList;
  					console.log(zeroWasteShop);
  					$.each(zeroWasteShop, function(index, value){
  						var address = value.address;
  						var name = value.name;
  						var closeddays = value.closeddays;
  						var contact = value.contact;
  						var latitude = value.latitude;
  						var longitude = value.longitude;
  						
  						latlngs.push(new naver.maps.LatLng(latitude, longitude));
  						addressArr.push(address);
  						nameArr.push(name);
  						cdayArr.push(closeddays);
  						contactArr.push(contact);
  					});
  					console.log(addressArr);
  					console.log(nameArr);
  					console.log(cdayArr);
  					console.log(contactArr);
  					
  					// 각 latlngs 요소의 위치를 마커로 표시 
					for (var i=0; i<latlngs.length; i++) {
						var marker = new naver.maps.Marker({
							position: latlngs[i]
						});
						markers.push(marker);
						
						var contentString = [
							'<div class="iw_inner">',
							'	<h3>' + nameArr[i] + '</h3>',
							'	<p>' + addressArr[i] + '<br>',
							'		휴무일: ' + cdayArr[i] + '<br>',
							'		전화번호: ' + contactArr[i],
							'	</p>',	
							'</div>'	
						].join('');
						var infoWindow = new naver.maps.InfoWindow({
							content: contentString
						});
						infoWindows.push(infoWindow);						
					};
					
					for (var i=0; i<markers.length; i++) {
						naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
					};
					
					function getClickHandler(seq) {
						return function(e) {
							var marker = markers[seq];
							var infoWindow = infoWindows[seq];
							
							if(infoWindow.getMap()) {
								infoWindow.close();
							} else {
								infoWindow.open(map, marker);
							};
						};
					};
					
					naver.maps.Event.addListener(map, 'idle', function(){
						updatemarkers(map, markers);
					});
					
					function updatemarkers(map, markers) {
						var mapBounds = map.getBounds();
						var marker;
						var position;
						
						for (var i=0; i<markers.length; i++) {
							marker = markers[i];
							position = marker.getPosition();
							
							if(mapBounds.hasLatLng(position)) {
								showMarker(map, marker);
							} else {
								hideMarker(map, marker);
							};
						};
					};
					
					function showMarker(map, marker) {
						if(marker.setMap()) {
							return;
						} else {
							marker.setMap(map);
						};
					};
					
					function hideMarker(map, marker) {
						if(!marker.setMap()) {
							return;
						} else {
							marker.setMap(null);
						};
					};
  		});
	
 });