$(document).ready(function() {
	
	var voices = [];
	
	function setVoiceList() {
		voices = window.speechSynthesis.getVoices();
	}
	setVoiceList();
	
	if (window.speechSynthesis.onvoiceschanged !== undefined) {
		window.speechSynthesis.onvoiceschanged = setVoiceList;
	}
	
	function speech(txt) {
		if(!window.speechSynthesis) {
			alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
			return;
		}
		
		var lang = 'ko-KR';
		var utterThis = new SpeechSynthesisUtterance(txt);
		
		utterThis.onend = function (event) {
			console.log('end');
		};
		
		utterThis.onerror = function(event) {
			console.log('error', event);
		};
		
		var voiceFound = false;
		for(var i = 0; i < voices.length ; i++) {
			if(voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
				utterThis.voice = voices[i];
				voiceFound = true;
			}
		}
		
		if(!voiceFound) {
			alert('voice not found');
			return;
		}
		utterThis.lang = lang;
		utterThis.pitch = 1;
		utterThis.rate = 1; //속도
		window.speechSynthesis.speak(utterThis);
	}

	
	let recognition = null;
	var fulltext=null;

    function checkCompatibility() {
      recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "ko-KR";
      recognition.maxAlternatives = 5;

      if (!recognition) {
        alert("You cannot use speech api.");
      }
    }

    function startSpeechRecognition() {
      console.log('Start');

      recognition.addEventListener("speechstart", () => {
        console.log('Speech Start');
      });

      recognition.addEventListener("speechend", () => {
        console.log('Speech End');
      });

      recognition.addEventListener("result", (event) => {
    	  console.log('Speech Result', event.results);
          fulltext = event.results[0][0].transcript;
          document.getElementById("speech_result").value = fulltext;
          //alert("음성인식:"+fulltext);
      });

      recognition.start();
    }

    function endSpeechRecognition() {
      recognition.stop();
    }

    window.addEventListener('load', checkCompatibility);
	
	
    $("#speakBtn").click(function() {
    	startSpeechRecognition();

    });
	
	
	$("#SWVbtn").click(function() {
		//var fulltext=null;
		
		
		//startSpeechRecognition();
		alert("이 데이터를 전송합니다:"+fulltext);
		//fulltext=$("#speech_result").val();
		
		$.post("selectGarbageList.do",
				{
					fulltext:fulltext
					
				}, 
				function(data, status){
					//alert(status);
					//alert(data);
					var obj=JSON.parse(data);
					if(obj.garbagefound){
						data = "<h2>"+obj.garbagefound+"</h2><br>"
						+"<h4>"+obj.garbagedmfound+"</h4><br>"
						+"<h5>원하는 결과를 얻지 못하셨다면 쓰레기 이름을 직접 입력해 검색해 보세요.</h5>"
						+"<div id='searchWaste'><input size='15' id='fulltext1'><input type='button' id='selectGarbageListBtn1' value='검색'></div>";
						$("#resultDiv").html(data);
						speech(""+obj.garbagedmfound);
					}else{
						data = "<h2>"+obj.msg+"</h2><br>"
						+"<h5>원하는 결과를 얻지 못하셨다면 쓰레기 이름을 직접 입력해 검색해 보세요.</h5>"
						+"<div id='searchWaste'><input size='15' id='fulltext1'><input type='button' id='selectGarbageListBtn1' value='검색'></div>";
						$("#resultDiv").html(data);
					}
					
				}); //End POST
	}); //End ClickEvent
	
	$(document).on("click", "#selectGarbageListBtn1", function(event){
		var fulltext=$("#fulltext1").val();
		//alert(fulltext);
		
		$.post("selectGarbageList.do",
				{
					fulltext:fulltext	
				}, 
				function(data, status){
					//alert(status);
					//alert(data);
					var obj=JSON.parse(data);
					if(obj.garbagefound){
						
						data = "<h2>"+obj.garbagefound+"</h2><br>"
						+"<h4>"+obj.garbagedmfound+"</h4><br>";
						
						$("#resultDiv").html(data);
						speech(""+obj.garbagedmfound);
					}else{
						data = "<h2>"+obj.msg+"</h2><br>"
						+"<h5>원하는 결과를 얻지 못하셨다면 쓰레기 이름을 직접 입력해 검색해 보세요.</h5>"
						+"<div id='searchWaste'><input size='15' id='fulltext1'><input type='button' id='selectGarbageListBtn1' value='검색'></div>";
						$("#resultDiv").html(data);
					}
					
				}); //End Post
		
	});

});