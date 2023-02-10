import GetAppointsments from './scenarios/Appointments.js'
import BookAppointment from './scenarios/BookAppointment.js'
import Doctors from './scenarios/doctors.js'
import Location from './scenarios/location.js'
import Search from './scenarios/search.js'
import {group,sleep} from 'k6'


// This is use  only for ceate html Report 

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

export const options = {
    ext: {
        loadimpact: {
          projectID: 3607882,
          // Test runs with the same name groups test runs together
          name: "Mount Sinai Api"
        }
      },
}

export default ()=> {

    group(" Search appointment on MountSinai API ", ()=> {
        GetAppointsments()
    })
  
    group(" Book appointment on MountSinai API",()=> {
        BookAppointment()
    })
   
    group(" Find the Doctors on MountSinai API",()=> {
        Doctors()
    })

    group(" Check the locations on MountSinai API",()=> {
        Location()
    })
    group("  Search Page on MountSinai API",()=> {
        Search()
    })
    sleep(1)
}