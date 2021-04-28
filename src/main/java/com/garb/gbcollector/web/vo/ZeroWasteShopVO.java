package com.garb.gbcollector.web.vo;

public class ZeroWasteShopVO {
	private String name,address,closeddays,contact;
	private float latitude,longitude;
	
	public ZeroWasteShopVO() {
		super();
	}
	public ZeroWasteShopVO(String name, String address, String closeddays, String contact, float latitude,
			float longitude) {
		super();
		this.name = name;
		this.address = address;
		this.closeddays = closeddays;
		this.contact = contact;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCloseddays() {
		return closeddays;
	}
	public void setCloseddays(String closeddays) {
		this.closeddays = closeddays;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
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
		return "ZeroWasteShopVO [name=" + name + ", address=" + address + ", closeddays=" + closeddays + ", contact="
				+ contact + ", latitude=" + latitude + ", longitude=" + longitude + "]";
	}
	
	
}
