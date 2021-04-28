package com.garb.gbcollector.web.vo;

import com.garb.gbcollector.util.GarbageException;

public class GarbageVO {
	
	private String garbagetype, garbagename, garbagedm;
	
	public GarbageVO(String garbagetype, String garbagename, String garbagedm) throws GarbageException {
		this(garbagename, garbagedm);
		setGarbagetype(garbagetype);
	}
	

	public GarbageVO(String garbagename, String garbagedm) throws GarbageException {
		this(garbagename);
		setGarbagedm(garbagedm);		
	}
	
	public GarbageVO(String garbagename) throws GarbageException{
		super();
		setGarbagename(garbagename);
	}
	
	public GarbageVO() {
		super();
	}
	
	public String getGarbagetype() {
		return garbagetype;
	}

	public void setGarbagetype(String garbagetype) {
		this.garbagetype = garbagetype;
	}

	public String getGarbagename() {
		return garbagename;
	}

	public void setGarbagename(String garbagename) throws GarbageException {
		this.garbagename = garbagename;
	}

	public String getGarbagedm() {
		return garbagedm;
	}

	public void setGarbagedm(String garbagedm) throws GarbageException {
		this.garbagedm = garbagedm;
	}

	@Override
	public String toString() {
		return "[garbagename=" + garbagename + ", garbagedm=" + garbagedm + "]";
	}
	
	
	
	

}
