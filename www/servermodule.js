
//import axios from './axios';

function ServerModule(myFileSystem, pfolder, clientfunction) {
  this.filesys = myFileSystem;
  this.folder = pfolder;
  this.clientfunction = clientfunction;
  //make these constructor parameters
  this.home = 'https://www.patronet.com/';
  this.passkey = 'Exeter';

this.server = async function (m){
  var callback = this.clientfunction;
  switch(m.sub){
    case 'cache':{
      let s = m.source;
      let t = m.target;
      let c = m.service;
      let f = this.filesys.readdirSync(s);
      uploadCache(t,s,f,c);
      break;
    }
    case 'cachelist':{
      var formData = new FormData();
      formData.append('code', this.passkey)
      formData.append('op', 'list')
      formData.append('target', m.target);
      axios.post(m.service, formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        callback({call: 'server', sub : 'cachelist', data: response.data});
      });
      break;
    }
    case 'uncache':{
      var formData = new FormData();
      formData.append('code', this.passkey)
      formData.append('op', 'delete')
      formData.append('target', m.target);
      axios.post(m.service, formData, {headers: {'Content-Type': 'multipart/form-data'}});
      break;
    }
    case 'cachename':{
      var formData = new FormData();
      formData.append('code', this.passkey)
      formData.append('op', 'rename')
      formData.append('from', m.from)
      formData.append('to', m.to);
      axios.post(m.service, formData, {headers: {'Content-Type': 'multipart/form-data'}});
      break;
    }
    case 'cachethumb':{
      var formData = new FormData();
      formData.append('code', this.passkey)
      formData.append('op', 'thumbnail')
      formData.append('target', m.target);
      axios.post(m.service, formData, {headers: {'Content-Type': 'multipart/form-data'}});
      break;
    }
    case 'service':{
      var formData = new FormData();
          formData.append('code', this.passkey);
          var o = Object.keys(m.data);
          o.forEach((p) => {formData.append(p, m.data[p]);});
          axios.post(this.home + m.service, formData, {headers: {'Content-Type': 'multipart/form-data'}})
          .then((response) => {
            callback({call: 'server', sub : 'service', op: m.data.op, data: response.data});
          });
          
          break;
        }
      }
}

this.uploadCache = async function (t, s, l, c){
    l.forEach((f) => {
      if(f.startsWith('.')){return;}
      var ft = getMIMEType(s + f);
      var formData = new FormData();
      formData.append('code', this.passkey)
      formData.append('op', 'create')
      formData.append('target', t);
      formData.append('file', fs.createReadStream(s + f), f);
      axios.post(c, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
          }
        });
      this.callback({call: 'server', sub: "cached", type: ft, data: f});
    })
  }

  this.doAxios = async function () {
    console.log("running axios test");
        const {data} = await axios.post('https://www.patronet.com/shows/publisher.php', {
    code: 'Exeter',
    op: 'find',
    keys: 'todd'  
    }, 
    {
      headers: {
        'Content-Type': 'multipart/form-data'
       }
     }
    )  
    console.log(JSON.stringify(data));
     }


}
  
//ES6 module syntax
export {ServerModule}
//CommonJS syntax
//module.exports = ServerModule;