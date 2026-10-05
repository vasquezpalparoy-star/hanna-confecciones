export function firebaseRules(uid='PEGA_AQUI_TU_UID') {
  return JSON.stringify({rules:{'.read':false,'.write':false,sites:{hanna:{
    '.read':true,
    '.write':`auth != null && auth.uid == ${JSON.stringify(uid)} && newData.exists()`,
    '.validate':"newData.hasChildren(['schemaVersion', 'content', 'updatedBy', 'updatedAt'])",
    schemaVersion:{'.validate':'newData.val() == 1'},
    updatedBy:{'.validate':'newData.isString() && newData.val() == auth.uid'},
    updatedAt:{'.validate':'newData.isNumber() && newData.val() == now'},
    content:{'.validate':"newData.hasChildren(['categories', 'brand', 'heroTitle'])"},
    '$other':{'.validate':false}
  }}}},null,2);
}
