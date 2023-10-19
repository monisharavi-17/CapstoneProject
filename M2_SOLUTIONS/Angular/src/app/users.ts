export class users{
  cid:string|undefined
  cname:string | undefined;
  cemail:string | undefined;
  cphone:string | undefined;
  cusername:string | undefined;
  cpassword:string | undefined;
  
 
}
export class userleads{
  leadid:number|undefined;
	lcmpname:string|undefined;
	requirement:string|undefined;
	contactname:string|undefined;
  lemail:string|undefined;
	jobposition:string|undefined;
	lphonenumber:string|undefined;
	laddress:string|undefined;
	website:string|undefined;
	adminname:string|undefined;
	teamname:string|undefined;
	country:string|undefined;
	cmpid:number|undefined;
	industry:string|undefined
	salesperson:string|undefined
	stage:string|undefined
	leadadminid:number|undefined
	lteamid:number|undefined
	timing:string|undefined
	meetlink:string|undefined
}
export class teams{
	teamid:number|undefined;
	cmpid:number|undefined;
	empid:number|undefined;
	teamname:string|undefined;
	adminname:string|undefined;
}
export class reporting{
	 team:string|undefined;
    newones:number|undefined;
   qualified:number|undefined;
    preposition:number|undefined;
    negotiation:number|undefined;
    won:number|undefined;
}