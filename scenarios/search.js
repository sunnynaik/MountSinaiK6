import { sleep, group,check } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data'
import { vus,duration,homeurl ,searchurl} from '../env_sunai.js'

export const options = { 
  
  vus: vus,
  duration: duration,
  thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(99)<2000'], // 95% of requests should be below 2000ms
    },
}


     const data = new SharedArray('some data name', function () {
      return JSON.parse(open('../rawdata/searchData.json')).users;
    });
    

export default function main() {
  let response

  group(`Page_1 - ${homeurl}`, function () {
    response = http.get(homeurl, {
      tags : {
        my_tag: "Home tag"
      },
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    
    response = http.get('https://doctor.mountsinai.org/fad/autocomplete/lite', {
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'iframe',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
   
  })
  check(response,{
    "search box status is ok 200": (r)=> r.status === 200,
})
  const user = data[0];

  for(const getdata of data){
    // console.log(getdata.query)
  
  group(`Page_2 - ${searchurl}`, function () {
    response = http.get(`${searchurl}?query=cardiologist`, {
      tags : {
        my_tag: "Search tags"
      },
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
  })
  check(response,{
  "found search status is ok": (r)=> r.status === 200
})
}

}