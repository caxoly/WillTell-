package com.cy.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

public class HttpUtils {
	public static String sendGet(String url,Map<String,String> parameters){
		String result = "";
		BufferedReader in = null;
		StringBuffer sb = new StringBuffer();
		String params = "";
		try {
			if(parameters.size()==1){
				for (String name : parameters.keySet()) {
					sb.append(name).append("=").append(java.net.URLEncoder.encode(parameters.get(name),"UTF-8"));
				}
				params=sb.toString();
			}else{
				for (String name : parameters.keySet()) {
					sb.append(name).append("=").append(java.net.URLEncoder.encode(parameters.get(name),"UTF-8")).append("&");
				}
				String temp_params = sb.toString();
				params = temp_params.substring(0,temp_params.length()-1);
			}
			String full_url = url+"?"+params;
			java.net.URL connURL = new java.net.URL(full_url);
			java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection)connURL.openConnection();
			httpConn.setRequestProperty("Accept", "*/*");
			httpConn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible;MSIE 8.0;Windows NT6.1)");
			httpConn.connect();
			Map<String,List<String>> headers = httpConn.getHeaderFields();
			in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(),"UTF-8"));
			String line;
			while((line=in.readLine())!=null){
				result+=line;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				if(in!=null){
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}
}
