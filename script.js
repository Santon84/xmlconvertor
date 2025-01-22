
const categoriesKamaz = { 
"24" : "Автобетоносмеситель",
"33" :"Полуприцеп",
"33?" :"Прицеп",
"22" :"Самосвал",
"30" :"Мультилифт",
"20" : "Тягач",
"23" :"Бортовой",
"21" :"Шасси",
"26" :"Бортовой с КМУ",
"25" :"Автотопливозаправщик",
"336" :"Ломовоз"}
const categoriesMaz = { 
    "20" :"Полуприцеп",
    "11" :"Самосвал",
    "10" : "Тягач",
    "8" :"Бортовой",
    "9" :"Шасси",
    }
let categories = {};



async function loadXML() { 
    try { 
        
        // const response = await fetch('./src/test.xml'); 
        // const xmlString = await response.text(); 
        categories = categoriesKamaz;
        const parser = new DOMParser(); 
        const inXML = document.getElementById('input');
        const outXML = document.getElementById('output');
        // console.log(inXML.value);
        const xmlDoc = parser.parseFromString(inXML.value, 'text/xml'); 

        let newXML = `<?xml version="1.0"?>
                      <data>
                      <cars>
                      `;

        const cars = xmlDoc.getElementsByTagName("offer");
        
        for (let i = 0; i < cars.length; i++) {
          // const name = cars[i].getElementsByTagName("model")[0].textContent;
          const price = cars[i]?.getElementsByTagName("price")[0].textContent;
          const vendor = cars[i]?.getElementsByTagName("vendor")[0]?.textContent;
          const model = cars[i]?.getElementsByTagName("model")[0].textContent;
          const url = cars[i]?.getElementsByTagName("url")[0].textContent;
          const picture = cars[i]?.getElementsByTagName("picture")[0].textContent;
          const categoryId = cars[i]?.getElementsByTagName("categoryId")[0].textContent;
          const color = 'Белый';
          if (vendor == 'МАЗ') categories = categoriesMaz;
          newXML+= `<car>
          <unique_id>${i}</unique_id>
          <mark_id>${vendor}</mark_id>
          <folder_id>${model}</folder_id>
          <url>${url}</url>
          <images>${picture}</images>
          <body_type>${categories[categoryId]}</body_type>
          <color>${color}</color>
          <availability>В наличии</availability>
          <custom>Растаможен</custom>
          <year>2024</year>
          <price>${price}</price>
          <currency>RUR</currency>
          <vin></vin>
          <owners_number>Не было владельцев</owners_number>
          </car>
          `
        
        } 
        newXML+= `</cars>
                  </data> `;
        outXML.value = newXML;

    } catch (error) { 
        console.error('Error loading XML:', error); 
    } 
    
}



