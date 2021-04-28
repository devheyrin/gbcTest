package com.garb.gbcollector.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.garb.gbcollector.web.service.GarbageService;
import com.garb.gbcollector.web.vo.GarbageVO;

@Controller
public class GarbageController {
	
	@Autowired
	GarbageService garbageService;
	
	@RequestMapping(value="selectGarbageList.do",
			method= {RequestMethod.POST},
			produces="application/text; charset=utf8")
	
	@ResponseBody
	public String selectGarbageList(HttpServletRequest request, HttpServletResponse response) {
		
		//fulltext: 화면에 입력 또는 음성인식을 통해 입력된 텍스트
		String fulltext = request.getParameter("fulltext");
		String fulltext2 = fulltext.replaceAll(" ", "");
		String garbagefound = null;
		String garbagedmfound = null;
		int flag=0;
		JSONObject json = new JSONObject();
		
		//Garbage테이블을 리스트로 받아오기
		List<GarbageVO> garbageList = garbageService.selectGarbageList();
		
		//리스트를 	배열로 변환 
		GarbageVO[] garbageArray = garbageList.toArray(new GarbageVO[garbageList.size()]);
		
		//배열 안에서 fulltext와 gabagename 비교 
		for (int i=0; i<garbageArray.length; i++) {
			if(fulltext2.indexOf(garbageArray[i].getGarbagename())!=-1) {
				//일치하는 데이터가 있으면 flag에 1을 부여 
				flag=1;
			
				garbagefound = garbageArray[i].getGarbagename();
				garbagedmfound = garbageArray[i].getGarbagedm();
				System.out.println(garbagefound);
				System.out.println(garbagedmfound);
				json.put("garbagefound", garbagefound);
				json.put("garbagedmfound", garbagedmfound);
			
				break;
			} else {
				json.put("msg", "일치하는 데이터가 없습니다");
			}
		}
		return json.toJSONString();
		
		/*
		if(flag!=1) {
			System.out.println("일치 텍스트 없음");
		}
		//garbagedmfound: 화면에 출력 or tts로 음성합성에 사용할 분리배출정보 데이터 
		
		return garbagedmfound;
		*/
	}
	
	
	
	/*
	 * @RequestMapping(value="selectGarbage.heyrin", method= {RequestMethod.POST},
	 * produces="application/text; charset=utf8")
	 * 
	 * @ResponseBody public String selectGarbage(HttpServletRequest request,
	 * HttpServletResponse response) { String garbagename =
	 * request.getParameter("garbagename");
	 * 
	 * try { GarbageVO garbageVO=new GarbageVO(garbagename); String
	 * garbagedm=garbageService.selectGarbage(garbageVO); if(garbagedm!=null) {
	 * HttpSession session = request.getSession(); session.setAttribute("garbage",
	 * garbageVO); return garbagedm; }else { return "조회 실패"; }
	 * 
	 * }catch(Exception e) { return e.getMessage(); }
	 * 
	 * }
	 */
}
