 $(document).ready(function(){
  	
  		// index.html <div id='body'>에 맵이 들어갈 <div> 추가
  		var mapDiv = '<div id="map" style="width: 100%; height: 900px;"></div>';
  		$('#body').html(mapDiv);
  		
  		// 맵 <div>에 맵을 표시 
	 	var map = new naver.maps.Map(document.getElementById('map'), {
			    zoom: 16,
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
	    
	    // 클러스터 로고 관련 설정(이미지, 크기 등)
	    var htmlMarker1 = {
	        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background:url(../img/cluster-marker-1.png);background-size:contain;"></div>',
	        size: N.Size(60, 60),
	        anchor: N.Point(20, 20)
	    },
	    htmlMarker2 = {
	        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background:url(../img/cluster-marker-2.png);background-size:contain;"></div>',
	        size: N.Size(60, 60),
	        anchor: N.Point(20, 20)
	    },
	    htmlMarker3 = {
	        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background:url(../img/cluster-marker-3.png);background-size:contain;"></div>',
	        size: N.Size(60, 60),
	        anchor: N.Point(20, 20)
	    },
	    htmlMarker4 = {
	        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background:url(../img/cluster-marker-4.png);background-size:contain;"></div>',
	        size: N.Size(60, 60),
	        anchor: N.Point(20, 20)
	    },
	    htmlMarker5 = {
	        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background:url(../img/cluster-marker-5.png);background-size:contain;"></div>',
	        size: N.Size(60, 60),
	        anchor: N.Point(20, 20)
	    };
	    
	    // 서버로 쓰레기통 위치 데이터 요청을 하고, 
	    // 이를 받아 latlngs 배열에 위도와 경도를 추가,
	    // addressArr 배열에 쓰레기통 주소를 추가
  		var latlngs = [];
  		var trashCans = [];
  		var addressArr = [];
  		var markers = [];
  		var infoWindows = [];
  		$.post('../showTrashCans.do', 
  				{}, 
  				function(data, status){
  					var object = JSON.parse(data);
  					trashCans = object.trashCanList;
  					console.log(trashCans);
  					$.each(trashCans, function(index, value){
  						var address = value.address;
  						var latitude = value.latitude;
  						var longitude = value.longitude;
  						
  						latlngs.push(new naver.maps.LatLng(latitude, longitude));
  						addressArr.push(address);
  					});
  					console.log(addressArr);
  					
  					// for문을 통해 latlngs, addressArr 배열에 저장된 정보를 각각 marker와 infoWindow(정보창)에 저장하고,
  					// 개별 marker와 infoWindow 객체를 각각 markers, infoWidnows 배열에 저장
					for (var i=0; i<latlngs.length; i++) {
					
						// 각 latlngs 요소의 위치를 marker에 저장하고 이를 미리 선언한 markers 배열에 추가
						var marker = new naver.maps.Marker({
							position: latlngs[i]
						});
						markers.push(marker);
						
						// 정보창에 입력할 쓰레기통 주소 HTML을 contentString에 저장하고,
						// 각 contentString을 infoWindow에 저장한 뒤
						// 각 infoWindow를 미리 선언한 infoWindows 배열에 추가
						var contentString = [
							'<div class="iw_inner"><h3>',
							addressArr[i],
							'</h3></div>'
						].join('');
						var infoWindow = new naver.maps.InfoWindow({
							content: contentString
						});
						infoWindows.push(infoWindow);						
					};
					
					// for문을 통해 개별 marker에 클릭 시 infoWindow를 띄우는 이벤트를 단다
					for (var i=0; i<markers.length; i++) {
						naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
					};
					
					// marker 클릭시 실행되는 function
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
					
					/*// 맵 전체에 화면 움직임이 멈출 때마다(사용자가 맵을 만지지 않는 상태가 되면) 보이는 화면에 marker를 띄우는 이벤트를 단다
					naver.maps.Event.addListener(map, 'idle', function(){
						updatemarkers(map, markers);
					});
					
					// 화면이 멈출 때 실행되는 function
					// 현재 보이는 화면의 Bounds(화면에 보이는 지도 범위의 좌표 경계값)를 얻고,
					// markers 배열의 각 marker 중 현재 Bounds 내부에 위치한 marker만 표시하고 아닌 marker는 숨김
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
					};*/
  		});
  		
  		// 클러스터를 맵 위에 표시
  		// 이미 가지고 있는 markers의 marker에 대하여 적용
  		// 10, 100, 200, 500, 1000을 기준으로 클러스터 로고를 다르게 사용
  		var markerClustering = new MarkerClustering({
	        minClusterSize: 2,
	        maxZoom: 17,
	        map: map,
	        markers: markers,
	        disableClickZoom: false,
	        gridSize: 150,
	        icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
	        indexGenerator: [10, 100, 200, 500, 1000],
	        averageCenter: true,
	        stylingFunction: function(clusterMarker, count) {
	            $(clusterMarker.getElement()).find('div:first-child').text(count);
	        }
	    });
	
 });