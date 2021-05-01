let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://restcountries.eu/rest/v2/all');
xhr.send();
xhr.onload = function() {
  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    let responseObj = JSON.parse(xhr.response);
    let countries= document.getElementById('output');
    let asian_countries=document.getElementById('asian_countries');
    let population_lt_2l=document.getElementById('pop_lt_2l');
    let usd_currency=document.getElementById('usd_curr');
    var table = document.createElement('table');
    var thead=document.createElement('thead');
    var th1=document.createElement('th');
    var th2=document.createElement('th');
    var th3=document.createElement('th');
    var cnt_name=document.createTextNode('name');
    var cnt_capit=document.createTextNode('capital');
    var flg=document.createTextNode('flag');
    th1.appendChild(cnt_name);
    th2.appendChild(cnt_capit);
    th3.appendChild(flg);
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    table.appendChild(thead);
    var tbody=document.createElement('tbody');
    responseObj.forEach(element => {
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3=document.createElement('td');
    var text1 = document.createTextNode(element.name);
    var text2 = document.createTextNode(element.capital);
    var img=document.createElement('img');
    var attr=document.createAttribute('src');
    attr.value=element.flag;
    img.height="100";
    img.width="100";
    img.setAttributeNode(attr);
    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
    });
    document.body.appendChild(table);
    document.getElementById('tot_pop').value=responseObj.reduce((acc,ind)=>{
      return acc+parseInt(ind.population);
    },0);
    asian_countries.value=responseObj.filter(obj =>{
      if(obj.region==='Asia')
         return true;
    }).map(obj=>{
      return obj.name;
    });
    population_lt_2l.value=responseObj.filter(obj =>{
      if(obj.population<200000)
         return true;
    }).map(obj=>{
      return obj.name;
    });
    countries.value=responseObj.map(obj =>{
        return obj.name
    });
    usd_currency.value=responseObj.filter(obj =>{
      if(obj.currencies[0].code==='USD')
         return true;
    }).map(obj=>{
      return obj.name;
    });
  }
};
