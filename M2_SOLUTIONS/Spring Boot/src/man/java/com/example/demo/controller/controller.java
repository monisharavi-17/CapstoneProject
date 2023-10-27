package com.example.demo.controller;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import java.sql.Date;

import java.util.List;

 
//
import org.apache.commons.io.FileUtils;
//
//import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
//import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.SendMailBySite;
import com.example.demo.message;
import com.example.demo.tracking;
import com.example.demo.xltodb;
import com.example.demo.entity.Allusers;
import com.example.demo.entity.Companies;
import com.example.demo.entity.Employees;
import com.example.demo.entity.UserLeads;
import com.example.demo.entity.crmleads;
import com.example.demo.entity.logs;
import com.example.demo.entity.reporting;
import com.example.demo.entity.salesperson;
import com.example.demo.entity.signup;
import com.example.demo.entity.teams;
import com.example.demo.repository.allusersrepo;
import com.example.demo.repository.comprepo;
import com.example.demo.repository.crmleadsrepo;
import com.example.demo.repository.employeerepo;
import com.example.demo.repository.leadsrepo;
import com.example.demo.repository.logrepo;
import com.example.demo.repository.salesrepo;
import com.example.demo.repository.signuprepo;
import com.example.demo.repository.teamsrepo;

import jakarta.servlet.ServletContext;

import java.io.File;

@RestController  
@CrossOrigin

 
public class controller {
	public static List<UserLeads> uselead;
	public static String path;
	@Autowired
    private signuprepo reps;
	@Autowired 
	private employeerepo emprepo;
	@Autowired
	private salesrepo salerepo;
	@Autowired
	private allusersrepo allrep;
	@Autowired
	private comprepo cmprep;
	@Autowired
	private leadsrepo leadrep;
	@Autowired
	private teamsrepo teamrep;
	@Autowired
	private crmleadsrepo cleadrep;
	@Autowired ServletContext context;
	@Autowired 
	private logrepo logrep;
    @PostMapping("/getcompany")
    public List<Companies> getcomapnies(@RequestBody tracking credential) {
    	System.out.println("hii");
    	
    	return cmprep.findByCeoid(credential.getLid());
    }

    @PostMapping("/connecttoadmin")
    public List<Allusers> adminconnect(@RequestBody tracking credential) {
    	List<Companies> l=cmprep.findByCmpname(credential.getLdatabase());
    	
    	int id=-1;
    	if(l.size()>0) {
    		
    		id=l.get(0).getCmpid();
    		System.out.println(id);
    	}
    	System.out.println(credential.getLcid()+"hello");
    	return allrep.findByCmpid(id);   // changed from id
    
    }
    @PostMapping("/getleads")
    public List<UserLeads> getleads(@RequestBody tracking credential) {
    	
    	return leadrep.findByCmpid(credential.getLcid());
    
    }
    @PostMapping("/changeadmin")
    public UserLeads changeadmin(@RequestBody UserLeads credential) {
    	UserLeads l=leadrep.findByLeadid(credential.getLeadid());
    	l.setAdminname(null);
    	l.setLeadadminid(credential.getLeadadminid());
    	l.setTeamname(null);
    	return leadrep.save(l);
    
    }
    @PostMapping("/photos")
    public Allusers photos(@RequestBody tracking credential) {
    	System.out.println(path+"hiii");
    	System.out.println(credential.getLid());
    	List<Allusers> l=allrep.findByEmpid(credential.getLid());
    	if(l.size()>0) {		
    		l.get(0).setPath(path);
    		allrep.save(l.get(0));    		
    	}
    	return l.get(0);
    	
    	
    }
    @PostMapping("/photos1")
    public Allusers photos1(@RequestBody tracking credential) {
    	System.out.println(path+"hiii");
    	System.out.println(credential);
    	List<Allusers> l=allrep.findByEmpid(credential.getPhotoid());
    	if(l.size()>0) {
    		
    		l.get(0).setPath(path);
    		allrep.save(l.get(0));
    		
    	}
    	
    	return l.get(0);
    }
    
    @PostMapping("/imports")
    public void importleads(@RequestBody tracking credential) {
    	
        for(int i=0;i<uselead.size();i++) {
        	UserLeads c=uselead.get(i);
            c.setAdminname(credential.getLadminname());
            c.setLeadadminid(credential.getLeadadminid());
            c.setCmpid(credential.getLcid());
            c.setEmpid(credential.getLid());
            c.setStage("New");
        	boolean isExists = leadrep.existsByLemailIgnoreCase(c.getLemail());
            	if (!isExists) {
            			leadrep.save(c);
            	}
            	else {
            		List<UserLeads> l1=leadrep.findByLemail(c.getLemail());
            		int y=0;
            		for(int j=0;j<l1.size();j++) {
            			if(l1.get(j).getCmpid()==c.getCmpid()) {
            				y=1;
            			}
            		}
            		if(y==0) {
            			leadrep.save(c);
            		}
            	}
        }
    	
    
    }
    @PostMapping("/saveFile")

    public ResponseEntity<String> saveFile(@RequestParam("file") MultipartFile file) throws IOException

    {

//    	file f = new ObjectMapper().readValue("hi",file.class);

//    	f.setCreatedDate(new Date(0));

//    	file dbf = null;

    	

    	boolean isExist = new File(context.getRealPath("/Files")).exists();

    	if (!isExist)

    	{

    		new File(context.getRealPath("/Files")).mkdir();

    	}

    	String filename = file.getOriginalFilename();

    	String modifiedfilename = FilenameUtils.getBaseName(filename)+"_"+System.currentTimeMillis()+"."+FilenameUtils.getExtension(filename);

    	File file1 = new File(context.getRealPath("/Files/"+File.separator+modifiedfilename));

    	try {

    		FileUtils.writeByteArrayToFile(file1, file.getBytes());
        	String filename1=context.getRealPath("/Files/"+File.separator+modifiedfilename);
        	xltodb test = new xltodb();
            test.setInputFile(filename1);
            List<UserLeads> l=test.read();
            System.out.println(l);
            uselead=l;
//            for(int i=0;i<l.size();i++) {
//            	crmleads c=l.get(i);
//            
//            	boolean isExists = cleadrep.existsByLemailIgnoreCase(c.getLemail());
//                if (!isExists) {
//            	cleadrep.save(l.get(i));
//                }
//            }

    	}

    	catch(Exception e)

    	{

    		e.printStackTrace();

    	}

//    	f.setFileName(modifiedfilename);

		try {

//			dbf = fileService.save(f);

		} catch (Exception e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

//    	if (dbf!=null)

//    	{

//    		

//    		return new ResponseEntity<Responce>(new Responce("saved"),HttpStatus.OK);

//    	}

//    	else

//    	{

//    		return new ResponseEntity<Responce>(new Responce("not saved"),HttpStatus.BAD_REQUEST);

//    	}

		return null;

    }
   

    @PostMapping("/savePhoto")

        public tracking savePhoto(@RequestParam("file") MultipartFile file) throws IOException

        {
    		tracking t=new tracking();
//        	file f = new ObjectMapper().readValue("hi",file.class);

//        	f.setCreatedDate(new Date(0));

//        	file dbf = null;

        	

        	boolean isExist = new File(context.getRealPath("/Photos")).exists();

        	if (!isExist)

        	{

        		new File(context.getRealPath("/Photos")).mkdir();

        	}

        	String filename = file.getOriginalFilename();

        	String modifiedfilename = FilenameUtils.getBaseName(filename)+"_"+System.currentTimeMillis()+"."+FilenameUtils.getExtension(filename);
        	path="assets\\"+File.separator+modifiedfilename;
//        	File file1 = new File(path);
        	File file2=new File("C:\\Users\\monisha.dr\\M2_Solutions\\src\\assets\\"+File.separator+modifiedfilename);
        	System.out.println(path);

        	try {

//        		FileUtils.writeByteArrayToFile(file1, file.getBytes());
        		FileUtils.writeByteArrayToFile(file2, file.getBytes());

        	}

        	catch(Exception e)

        	{

        		e.printStackTrace();

        	}


    		try {

//    			dbf = fileService.save(f);

    		} catch (Exception e) {

    			// TODO Auto-generated catch block

    			e.printStackTrace();

    		}
    			t.setPath(path);

    		return t;

        }
    @PostMapping("/changeteamid")
    public UserLeads changeteamid(@RequestBody UserLeads credential) {
    	UserLeads l=leadrep.findByLeadid(credential.getLeadid());
    	l.setTeamname(null);
    	l.setLteamid(0);
    	return leadrep.save(l);
    
    }
    @PostMapping("/addthelead")
    public UserLeads addthelead(@RequestBody UserLeads credential) {
    	UserLeads l=leadrep.findByLeadid(credential.getLeadid());
    	l.setAdminname(credential.getAdminname());
    	l.setLeadadminid(credential.getLeadadminid());
    	System.out.println(credential.getLeadadminid());
    	l.setTeamname(credential.getTeamname());
    	l.setLteamid(credential.getLteamid());
    	System.out.println(credential.getAdminname()+"hiii");
    	return leadrep.save(l);
    
    }
    @PostMapping("/updatepass")
    public void updatepass(@RequestBody Allusers credential) {
    	List<Allusers> l=allrep.findByEmpid(credential.getEmpid());
    	if(l.size()>0) {
    		l.get(0).setPassword(encryption(credential.getPassword()));
    		allrep.save(l.get(0));
    	}
    	signup s=reps.findByCid(credential.getEmpid());
    	if(s!=null) {
    		s.setCpassword(encryption(credential.getPassword()));
    		reps.save(s);
    	}
    	
    	Employees e=emprepo.findByEmpid(credential.getEmpid());
    	if(e!=null) {
    		e.setEmppassword(encryption(credential.getPassword()));
    		emprepo.save(e);
    	}
    	
    
    }
    @PostMapping("/getuserdata")
    public Allusers getuserdata(@RequestBody tracking credential) {
    	List<Allusers> l=allrep.findByEmpid(credential.getLmemberid());
    	
    	return l.get(0);
    
    }
    @PostMapping("/getmemberdetail")
    public List<Allusers> getmemberdetail(@RequestBody tracking credential) {
    	List<Allusers> l=allrep.findByTeamid(credential.getLteamid());
    	
    	return l;
    
    }
    @PostMapping("/updatestage")
    public void updatestage(@RequestBody tracking credential) {
    	UserLeads l=leadrep.findByLeadid(credential.getUseleads().getLeadid());
    	System.out.println(credential.getUseleads().getLeadid());
    	l.setStage(credential.getUseleads().getStage());
    	leadrep.save(l);
    	
    
    }
    @PostMapping("/updatelog")
    public logs updatelog(@RequestBody logs credential) {
    	logs l=new logs();
    	l.setLog(credential.getLog());
    	l.setMessage(credential.getMessage());
    	l.setSalesman(credential.getSalesman());
    	l.setStageafter(credential.getStageafter());
    	l.setStagebefore(credential.getStagebefore());
    	l.setTeamid(credential.getTeamid());
    	l.setTeamname(credential.getTeamname());
    	l.setTimestamp(credential.getTimestamp());
    	l.setType(credential.isType());
    	l.setLeadid(credential.getLeadid());
    	System.out.println(credential.getLeadid());
    	return logrep.save(l);
    }
    @PostMapping("/getlog")
    public List<logs> getlog(@RequestBody tracking credential) {
    	System.out.println(credential.getLeadadminid());
    	
    	List<logs> m= logrep.findByLeadid(credential.getUseleads().getLeadid());
    	Collections.reverse(m);
    	return m;
    
    }
    @PostMapping("/gettheuser")
    public Allusers gettheuser(@RequestBody tracking credential) {
    	System.out.println(credential.getLeadadminid());
    	
    	List<Allusers> m= allrep.findByEmpid(credential.getLid());
    	return m.get(0);
    	
    
    }
    @PostMapping("/reportfromceo")
    public List<reporting> reportfromceo(@RequestBody tracking credential) {
    	System.out.println(credential.getLeadadminid()+"leads");
    	List<reporting> reports=new ArrayList<reporting>();
    	List<Allusers> m= allrep.findByCmpidAndEmprole(credential.getLcid(),"Admin");
    	for(int i=0;i<m.size();i++) {
    		reporting r=new reporting();
    		Allusers l=m.get(i);
    		int id1=l.getEmpid();
    		List<UserLeads> leadsofadmin=leadrep.findByLeadadminid(id1);
    		r.setTeam(l.getEmpname());
    		int n=0;
    		int q=0;
    		int p=0;
    		int ne=0;
    		int w=0;
    		for(int j=0;j<leadsofadmin.size();j++) {
    			if(leadsofadmin.get(j).getStage().equals("New")) {
    				n++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Qualified")) {
    				q++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Preposition")) {
    				p++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Negotiation")) {
    				ne++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Won")) {
    				w++;
    			}
    			
    		}
    		r.setNegotiation(ne);
    		r.setNewones(n);
    		r.setPreposition(p);
    		r.setQualified(q);
    		r.setWon(w);
    		reports.add(r);
    		System.out.println(r.getNewones());
    		
    	}
    	return reports;
    	
    
    }
    @PostMapping("/reportfromadmin")
    public List<reporting> reportfromadmin(@RequestBody tracking credential) {
    	System.out.println(credential.getLeadadminid()+"leads");
    	List<reporting> reports=new ArrayList<reporting>();
    	List<teams> m= teamrep.findByCmpidAndAdminname(credential.getLcid(),credential.getLname());
    	for(int i=0;i<m.size();i++) {
    		reporting r=new reporting();
    		teams l=m.get(i);
    		int id1=l.getTeamid();
    		List<UserLeads> leadsofadmin=leadrep.findByLteamid(id1);
    		r.setTeam(l.getTeamname());
    		int n=0;
    		int q=0;
    		int p=0;
    		int ne=0;
    		int w=0;
    		for(int j=0;j<leadsofadmin.size();j++) {
    			if(leadsofadmin.get(j).getStage().equals("New")) {
    				n++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Qualified")) {
    				q++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Preposition")) {
    				p++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Negotiation")) {
    				ne++;
    			}
    			else if(leadsofadmin.get(j).getStage().equals("Won")) {
    				w++;
    			}
    			
    		}
    		r.setNegotiation(ne);
    		r.setNewones(n);
    		r.setPreposition(p);
    		r.setQualified(q);
    		r.setWon(w);
    		reports.add(r);
    		System.out.println(r.getNewones());
    		
    	}
    	return reports;
    	
    
    }
    @PostMapping("/updateuser")
    public Allusers updateuser(@RequestBody Allusers credential) {
    	Allusers m= allrep.findByEmpid(credential.getEmpid()).get(0);
    	if(m!=null) {
//    		String h=encryption(credential.getPassword());
//    	m.setPassword(h);
    	m.setEmpname(credential.getEmpname());
    	m.setPhonenumber(credential.getPhonenumber());
    	allrep.save(m);
    	}
    	signup s= reps.findByCid(credential.getEmpid());
    	if(s!=null) {
//    		String h=encryption(credential.getPassword());
//    	s.setCpassword(h);
    	s.setCname(credential.getEmpname());
    	s.setCphone(credential.getPhonenumber());
    	reps.save(s);
    	}
    	Companies c= cmprep.findByCeoid(credential.getEmpid()).get(0);
    	if(c!=null) {
    	c.setCeoname(credential.getEmpname());
    	c.setCmpphonenumber(credential.getPhonenumber());
    	cmprep.save(c);
    	}
    	Employees e=emprepo.findByEmpid(credential.getEmpid());
    	if(e!=null) {
//    		String h=encryption(credential.getPassword());
    	e.setEmpname(credential.getEmpname());
//    	e.setEmppassword(h);
    	e.setEmpphonenum(credential.getPhonenumber());
    	emprepo.save(e);
    	}
    	return m;
    	
    
    }
    @PostMapping("/gettheleads")
    public List<UserLeads> gettheleads(@RequestBody tracking credential) {
    	System.out.println(credential.getLeadadminid());
    	
    	return leadrep.findByLeadadminid(credential.getLeadadminid());
    
    }
    @PostMapping("/gettheleadsforteams")
    public List<UserLeads> gettheleadsteams(@RequestBody tracking credential) {
    	System.out.println(credential.getLteamid()+"monisha here");
    	
    	return leadrep.findByLteamid(credential.getLteamid());
    
    }
    @PostMapping("/addadmin")
    public message aadminadd(@RequestBody Allusers credential) {
    	message m=new message();
    	
    	List<Allusers> l =allrep.findByUsername(credential.getUsername());
    	List<Employees> l1=emprepo.findByEmpusername(credential.getUsername());
    	List<Allusers> l2 =allrep.findByEmail(credential.getEmail());
    	List<Employees> l3=emprepo.findByEmpemail(credential.getEmail());
    	if(l.size()==0&&l1.size()==0&&l2.size()==0&&l3.size()==0) {
    		
    		Employees e=new Employees();
    		e.setAddress(credential.getAddress());
    		e.setCmpid(credential.getCmpid());
    		e.setEmpemail(credential.getEmail());
    		
    		
    		e.setEmpname(credential.getEmpname());
    		String h=encryption(credential.getPassword());
    		e.setEmppassword(h);
    		e.setEmpphonenum(credential.getPhonenumber());
    		e.setEmprole(credential.getEmprole());
    		e.setEmpusername(credential.getUsername());
    		Employees e1=emprepo.save(e);
    		credential.setCmpid(e1.getCmpid());
    		credential.setEmpid(e1.getEmpid());
    		credential.setPassword(h);
    		m.setEmpid(e1.getEmpid());
    		allrep.save(credential);
    		SendMailBySite s=new SendMailBySite();
    		 try {
   			s.sendMail(credential.getEmail(),credential);
   		} catch (Exception e2) {
   			// TODO Auto-generated catch block
   			e2.printStackTrace();
   		}
    		m.setMess("Admin created successfully");
    		
    		m.setResult(true);
    	}
    	else {
    		m.setMess("Admin already available");
    		m.setResult(false);
    	}
    	return m;
    
    }
    public static String encryption(String credential) {
    	String m=new String();
    	for(int i=0;i<credential.length();i++) {
    		int n=credential.charAt(i);
    	
    		m+=(Integer.toString(n)+"*");
    		
    	}
    	System.out.println(m);
    	return m.substring(0, m.length()-1);
    }
    public static String decryption(String credential) {
    	System.out.println(credential);
    	String m=new String();
    	String [] n=credential.split("\\" + "*");
    	System.out.println(n);
    	for(int i=0;i<n.length;i++) {
    		System.out.println(n[i]);
    	  if(n[i].length()!=0) {
    		m+=((char)(Integer.parseInt(n[i])));
    		System.out.println(m);
    	  }
    		
    	}
    	return m;
    }
    
    @PostMapping("/saveceo")
    public message saving(@RequestBody signup f) {
    	message m=new message();
    	List<Allusers> l=allrep.findByEmail(f.getCemail());
    	List<Allusers> l1=allrep.findByUsername(f.getCusername());
    	if(l.size()>0) {
    		m.setMess("email already exist");
    		m.setResult(false);
    		return m;
    	}
    	else if(l1.size()>0) {
    		m.setMess("username already exist");
    		m.setResult(false);
    		return m;
    	}
    	else {
    	reps.save(f);
    	 Allusers e=new Allusers();
    	 e.setEmail(f.getCemail());
    	 e.setEmpid(f.getCid());
    	 e.setEmpname(f.getCname());
    	 String h=encryption(f.getCpassword());
    	 System.out.println(f.getCpassword()+" "+h);
    	 e.setPassword(h);
    	 e.setPhonenumber(f.getCphone());
    	 e.setEmprole("CEO");
    	 e.setUsername(f.getCusername());
    	 allrep.save(e);
    	 f.setCpassword(encryption(f.getCpassword()));
    	 reps.save(f);
    	 m.setMess("stored");
 		 m.setResult(true);
 		 m.setEmpid(f.getCid());
 		 SendMailBySite s=new SendMailBySite();
 		 try {
			s.sendMail(e.getEmail(),e);
			System.out.println(decryption(h)+" "+h);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
 		 return m;
    	}
    }
    
    @PostMapping("/checksignin")
    public message checking(@RequestBody Allusers credential) {
        message m=new message();
        List<Allusers> l1=allrep.findByUsername(credential.getUsername());
        System.out.println(l1);
        
        if(l1.size()==1 && decryption(l1.get(0).getPassword()).equals(credential.getPassword())) {
        	m.setMess("Successfully signed in");
        	m.setRole(l1.get(0).getEmprole());
        	m.setCmpid(l1.get(0).getCmpid());
        	m.setEmpid(l1.get(0).getEmpid());
        	m.setPassword(l1.get(0).getPassword());
        	m.setUsername(l1.get(0).getUsername());
        	m.setEmpname(l1.get(0).getEmpname());
        	m.setTeamid(l1.get(0).getTeamid());
        	m.setTeamname(l1.get(0).getTeamname());
        	m.setPath(l1.get(0).getPath());
        	m.setResult(true);
        }
        
        else {
        	
            
        	m.setMess("Username password not match");
        	m.setResult(false);
        }
    	return m;
    }
    @PostMapping("/createcompany")
    public message savesalesman(@RequestBody Companies credential) {
    	List<Companies> l=cmprep.findByCmpname(credential.getCmpname());
    	message m=new message();
    	if(l.size()>0) {
    		m.setMess("Comapny name already available");
    		m.setResult(false);
    		
    	}
    	else {
    		cmprep.save(credential);
    		m.setMess("Comapny successfully created!!");
    		m.setResult(true);
    	}
    	
    
		return  m;
    	
    
    }
    @PostMapping("/getcompid")
    public List<Companies> getcompanyid(@RequestBody tracking credential) {
    	return cmprep.findByCmpname(credential.getLdatabase());
    	
    }
    @PostMapping("/schedulemeet")
    public void schedulemeet(@RequestBody tracking credential) throws Exception {
    	SendMailBySite s=new SendMailBySite();
    	UserLeads l=leadrep.findByLeadid(credential.getUseleads().getLeadid());
    	System.out.println(credential.getUseleads().getLeadid());
    	l.setTiming(credential.getTiming());
    	l.setMeetlink(credential.getMeetlink());
    	s.sendMail(l.getLemail(),l);
    	
    }
    @PostMapping("/gototeamslist")
    public List<teams> getteams(@RequestBody tracking credential) {
    	System.out.println(credential.getLadminname()+" "+credential.getLmemberid());
//    	int r=allrep.findByEmpid(credential.getLmemberid()).get(0).getCmpid();
    	System.out.println(credential.getLadminname());
//    	System.out.println(r);
    	return teamrep.findByAdminnameAndCmpid(credential.getLadminname(),credential.getLcid());
    	
    }
    @PostMapping("/createteam")
    public message createteams(@RequestBody tracking credential) {
    	System.out.println(credential.getLmemberid());
    	message m=new message();
    	System.out.println(credential.getLmemberid()+" "+credential.getLmembers()[0]);
    	List<Allusers> l=allrep.findByEmpid(credential.getLsalespersonid());
    	if(l.size()!=0) {
    	teams d=new teams();
    	d.setAdminname(credential.getLadminname());
    	d.setCmpid(credential.getLcid());
    	d.setEmpid(credential.getLmemberid());
    	d.setTeamname(credential.getLteam());
    	
    	teams t=teamrep.save(d);
    	l.get(0).setTeamname(t.getTeamname());
    	l.get(0).setAdminname(credential.getLadminname());
    	l.get(0).setTeamid(t.getTeamid());
    	System.out.println(l.get(0).getTeamname());
    	allrep.save(l.get(0));
    	
    	m.setMess("Salesperson added to team!!!");
    	m.setResult(true);
    	}
    	else {
    		m.setMess("Salesperson not available");
    		m.setResult(false);
    	}
    	return m;
    	
    }
    @PostMapping("/connecttosales")
    public List<Allusers> connectsale(@RequestBody tracking credential) {
    	System.out.println(credential.getLadminname());
    	System.out.println(credential.getLcid());
    	System.out.println(allrep.findByCmpidAndEmprole(credential.getLcid(),"salesperson").size());
    	return allrep.findByCmpidAndEmprole(credential.getLcid(),"salesperson");
    	
    }
    @PostMapping("/connectteams")
    public List<teams> connectteams(@RequestBody tracking credential) {
    	System.out.println(credential.getLadminname());
    	return teamrep.findByAdminnameAndCmpid(credential.getLadminname(),credential.getLcid());
    	
    }
    @PostMapping("/addsales")
    public message connectsale(@RequestBody Allusers credential) {
    	message m=new message();
    	
    	List<Allusers> l =allrep.findByUsername(credential.getUsername());
    	List<Employees> l1=emprepo.findByEmpusername(credential.getUsername());
    	List<Allusers> l2 =allrep.findByEmail(credential.getEmail());
    	List<Employees> l3=emprepo.findByEmpemail(credential.getEmail());
    	if(l.size()==0&&l1.size()==0&&l2.size()==0&&l3.size()==0) {
    		Employees e=new Employees();
    		e.setAddress(credential.getAddress());
    		e.setCmpid(credential.getCmpid());
    		e.setEmpemail(credential.getEmail());
    		
    		e.setEmpname(credential.getEmpname());
    		String h=encryption(credential.getPassword());
    		e.setEmppassword(h);
    		e.setEmpphonenum(credential.getPhonenumber());
    		e.setEmprole(credential.getEmprole());
    		e.setEmpusername(credential.getUsername());
    		Employees e1=emprepo.save(e);
//    		Allusers a=new Allusers();
//    		a.setAddress(credential.getAddress());
//    		a.setAdminname(credential.getAdminname());
//    		a.setCeoname(credential.getCeoname());
//    		a.setCmpid(e1.getCmpid());
//    		a.setEmail(credential.getEmail());
//    		a.setEmpid(e1.getEmpid());
//    		a.setEmpname(credential.getEmpname());
//    		a.setEmprole(credential.getEmprole());
//    		a.setPassword(credential.getPassword());
//    		a.setPhonenumber(credential.get)
    		credential.setCmpid(e1.getCmpid());
    		credential.setEmpid(e1.getEmpid());
    		credential.setPassword(h);
    		allrep.save(credential);
    		m.setEmpid(e1.getEmpid());
    		SendMailBySite s=new SendMailBySite();
    		 try {
   			s.sendMail(credential.getEmail(),credential);
   		} catch (Exception e2) {
   			// TODO Auto-generated catch block
   			e2.printStackTrace();
   		}
    		m.setMess("Salesperson created successfully");
    		
    		m.setResult(true);
    	}
    	else {
    		m.setMess("Salesperson already available");
    		m.setResult(false);
    	}
    	return m;
    
    	
    }
    @PostMapping("/addlead")
    public UserLeads addlead(@RequestBody UserLeads credential) {
    	
    	return leadrep.save(credential);
    	
    }
    @PostMapping("/connectleadsfromceo")
    public List<UserLeads> addlead(@RequestBody tracking credential) {
    	return leadrep.findByLeadadminid(credential.getLeadadminid());
    	
    }
    @PostMapping("/ceoleads")
    public List<UserLeads> ceolead(@RequestBody tracking credential) {
    	return leadrep.findByCmpid(credential.getLcid());
    	
    }
    
    @PostMapping("/connectleadsfromteam")
    public List<UserLeads> addleadfromteam(@RequestBody tracking credential) {
    	return leadrep.findByLteamid(credential.getLteamid());
    	
    }
    @PostMapping("/fromcrm")
    public message generatefromcrm(@RequestBody tracking credential) {
    	message m=new message();
    	List<crmleads> l=cleadrep.findByIndustry(credential.getIndustry());
    	if(l.size()>0) {
    	for(int i=0;i<l.size();i++) {
    		System.out.println("here");
//    		l.get(i).setCmpid(credential.getLcid());
//    		l.get(i).setAdminname(credential.getLadminname());
    		crmleads x=l.get(i);
    		UserLeads p=new UserLeads();
    		p.setAdminname(credential.getLadminname());
    		p.setCmpid(credential.getLcid());
    		p.setContactname(x.getContactname());
    		p.setCountry(x.getCountry());
    		p.setIndustry(x.getIndustry());
    		p.setJobposition(x.getJobposition());
    		p.setLaddress(x.getLaddress());
    		p.setLcmpname(x.getLcmpname());
    		p.setLeadid(x.getLeadid());
    		p.setLemail(x.getLemail());
    		p.setRequirement(x.getRequirement());
    		p.setLphonenumber(x.getLphonenumber());
//    		p.setTeamname(x.getTeamname());
    		p.setWebsite(x.getWebsite());
    		p.setEmpid(credential.getLid());
    		p.setStage("New");
    		if(credential.getLrole().equals("Admin")) {
    			p.setLeadadminid(credential.getLid());
    		}
    		else {
    			p.setLeadadminid(credential.getLmemberid());
    		}
    		leadrep.save(p);
    		m.setMess("Leads generated!!!");
    		m.setResult(true);
    	}
    	}
    	
    	return m;
    	
    }
    
//    @GetMapping("list")  
//    public List<accounts> allstudents() {  
//         return sevice1.getStudents();  
//          
//    }  
}
