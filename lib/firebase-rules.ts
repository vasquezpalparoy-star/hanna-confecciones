const admin="auth != null && auth.token.email == 'vasquezpalparoy@gmail.com' && auth.token.email_verified == true";
export function firebaseRules(_uid?:string) {
 const string=(max:number)=>({'.validate':`newData.isString() && newData.val().length <= ${max}`});
 const checks=Object.fromEntries(['model','design','sizes','quote','mockup','sample','registered','deposit','queue','print','cut','sew','quality','threads','iron','pack','notice','balance','delivery','receipt'].map(key=>[key,{'.validate':'newData.isBoolean()'}]));
 return JSON.stringify({rules:{'.read':false,'.write':false,sites:{hanna:{
    '.read':true,'.write':admin+' && newData.exists()',
    '.validate':"newData.hasChildren(['schemaVersion', 'content', 'updatedBy', 'updatedAt'])",
    schemaVersion:{'.validate':'newData.val() == 1'},
    updatedBy:{'.validate':'newData.isString() && newData.val() == auth.uid'},
    updatedAt:{'.validate':'newData.isNumber() && newData.val() == now'},
    content:{'.validate':"newData.hasChildren(['categories', 'brand', 'heroTitle'])"},
    '$other':{'.validate':false}
 }},hannaOrders:{
   '.read':admin,
   '$clientUid':{
    '.read':`auth != null && (auth.uid == $clientUid || (${admin}))`,
    '.write':admin+' && newData.exists()',
    '.validate':"newData.hasChildren(['profile'])",
    profile:{'.validate':"newData.hasChildren(['name','username','createdAt'])",name:{'.validate':'newData.isString() && newData.val().length > 0 && newData.val().length <= 120'},username:{'.validate':"newData.isString() && newData.val().matches(/^[a-z0-9][a-z0-9._-]{2,39}$/)"},createdAt:{'.validate':'newData.isNumber()'},'$other':{'.validate':false}},
    orders:{'$orderId':{
     '.validate':"newData.hasChildren(['id','reference','title','quantity','dueDate','notes','sampleRequired','updatedAt'])",
     id:{'.validate':'newData.val() == $orderId'},reference:{'.validate':'newData.isString() && newData.val().length > 0 && newData.val().length <= 60'},title:{'.validate':'newData.isString() && newData.val().length > 0 && newData.val().length <= 200'},quantity:{'.validate':'newData.isNumber() && newData.val() >= 1 && newData.val() <= 1000000 && newData.val() % 1 == 0'},dueDate:string(10),notes:string(4000),sampleRequired:{'.validate':'newData.isBoolean()'},updatedAt:{'.validate':'newData.isNumber() && newData.val() == now'},checks:{...checks,'$other':{'.validate':false}},'$other':{'.validate':false}
    }},'$other':{'.validate':false}
   }
 }}},null,2);
}
