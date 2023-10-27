package com.example.demo;

import java.util.Properties;  
import javax.mail.*;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.internet.*;

import com.example.demo.controller.controller;
import com.example.demo.entity.Allusers;
import com.example.demo.entity.UserLeads;

import java.util.*;
import java.text.SimpleDateFormat;  
import java.util.Date;  
import java.io.*;
import java.nio.file.*;
import java.time.LocalDate;
public class SendMailBySite {
	 public static void sendMail(String recepient,Allusers users)throws Exception{
		    System.out.println("Preparing to send");
		    Properties properties = new Properties();
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.auth","true");
		    //mail.smtp.ssl.protocols=TLSv1.2;
		    properties.put("mail.smtp.starttls.enable","true");
		    properties.put("mail.smtp.host","smtp.outlook.com");
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.port","587");
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
		    //properties.put("mail.smtp.socketFactory.port", "587");
		//properties.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
		//properties.put("mail.smtp.socketFactory.fallback", "false");
		    String myAccountEmail = "m2soltns@outlook.com";
		    String password = "monisha@123";
		    
		    Session session = Session.getInstance(properties,new Authenticator(){
		      @Override
		      protected PasswordAuthentication getPasswordAuthentication(){
		           return new PasswordAuthentication(myAccountEmail,password);
		      }
		    });
		    Message message = prepareMessage(session,myAccountEmail,recepient,users);
		    Transport.send(message);
		    System.out.println("Message sent");
		}
	 public static void sendMail(String recepient,UserLeads users)throws Exception{
		    System.out.println("Preparing to send");
		    Properties properties = new Properties();
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.auth","true");
		    //mail.smtp.ssl.protocols=TLSv1.2;
		    properties.put("mail.smtp.starttls.enable","true");
		    properties.put("mail.smtp.host","smtp.outlook.com");
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.port","587");
		    properties.put("mail.smtp.ssl.trust", "smtp.outlook.com");
		    properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
		    //properties.put("mail.smtp.socketFactory.port", "587");
		//properties.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
		//properties.put("mail.smtp.socketFactory.fallback", "false");
		    String myAccountEmail = "m2soltns@outlook.com";
		    String password = "monisha@123";
		    
		    Session session = Session.getInstance(properties,new Authenticator(){
		      @Override
		      protected PasswordAuthentication getPasswordAuthentication(){
		           return new PasswordAuthentication(myAccountEmail,password);
		      }
		    });
		    Message message = prepareMessage(session,myAccountEmail,recepient,users);
		    Transport.send(message);
		    System.out.println("Message sent");
		}
		 private static Message prepareMessage(Session session, String myAccountEmail, String recepient,Allusers str){
		    try{
		        Message message = new MimeMessage(session);
		        message.setFrom(new InternetAddress(myAccountEmail));
		        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
		        message.setSubject("Welcome to M2 SOLUTIONS");
		        System.out.println(controller.decryption(str.getPassword()));
		        String htmlCode = "<h1>Hello "+str.getEmpname()+" ,</h1><br><p> &nbsp WE ARE DELIGHTED TO HAVE YOU ON BOARD FOR M2 SOLUTIONS</p><br><p>\"Congratulations! You're going to be an amazing addition to our team.\"</p><br>"
+"<br><b>Your Username : "+str.getUsername()+"</b><br>"+"<br><b>Your One Time Login Code : "+controller.decryption(str.getPassword())+"</b><br><br><br><p>Please Login and update your password</p><br>"+
"<br><p>Happy Working!!</p><br><p>Thanks and Regards,</p><p>M2 SOLUTIONS</p>";
		        message.setContent(htmlCode,"text/html");
		        return message;
		    }
		    catch (Exception ex){
		        System.out.println("error");
		}
		 return null;
		}
		 private static Message prepareMessage(Session session, String myAccountEmail, String recepient,UserLeads str){
			    try{
			        Message message = new MimeMessage(session);
			        message.setFrom(new InternetAddress(myAccountEmail));
			        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
			        message.setSubject("Meeting Scheduled");
			        String htmlCode = "<h1>Hello "+str.getContactname()+" ,</h1><br><p> &nbsp This mail is regarding the meeting which is scheduled on "+str.getTiming()+" </p><br><br><p>Please join with the below meeting link </p><br><br><p>"+str.getMeetlink()+"</p><br><p>Please join the meet on time.</p><br><br><p>Thanks and Regards,</p><p>M2 SOLUTIONS</p>";
			        message.setContent(htmlCode,"text/html");
			        return message;
			    }
			    catch (Exception ex){
			        System.out.println("error");
			}
			 return null;
			}
//		 public static void main(String[] args) throws Exception {  
//			 
//		 }

		} 