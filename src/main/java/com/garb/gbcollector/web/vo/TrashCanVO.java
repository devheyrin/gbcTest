package com.garb.gbcollector.web.vo;

public class TrashCanVO {
	private String address;
	private float latitude,longitude;
	
	
	public TrashCanVO(String address, float latitude, float longitude) {
		super();
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public float getLatitude() {
		return latitude;
	}
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}
	public float getLongitude() {
		return longitude;
	}
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	@Override
	public String toString() {
		return "TrashCanVO [address=" + address + ", latitude=" + latitude + ", longitude=" + longitude + "]";
	}
	
	
	
	
}
