// Manage States
import { useState, useEffect } from 'react'
// Import App Specific CSS
import './App.css'

// Import Components
import Header from './components/Header'
import SearchSlot from './components/SearchSlot'
import ListSlots from './components/ListSlots'

function App() {
  // Controls for Form Items
  const [stateName, setStateName] = useState('');
  const [statesList, setStatesList] = useState([]);
  const [districtName, setDistrictName] = useState('')
  const [districtList, setDistrictList] = useState([])
  const [appointmentDate, setAppointmentDate] = useState(new Date())
  const [appointmentSlotList, setAppointmentSlotList] = useState([])
  const [ageFilter, setAgeFilter] = useState(0)
  const [vaccineFilter, setVaccineFilter] = useState('')

  //Get List of all States on Startup
  useEffect(() => {
    const initialFetch = async () => {
      await getStatesData()
      await getDistrictByStates(1)
    }

    initialFetch()

  }, [])

  // Function to fetch List of States
  const getStatesData = async () => {
    const statesApiMetadataUrl = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
    const resp = await fetch(statesApiMetadataUrl)

    const statesData = await resp.json();

    setStatesList(statesData.states)

    setStateName(statesData.states[0].state_id)
  }

  // Function to fetch List of Districts in State
  const getDistrictByStates = async (stateId) => {
    const districtApiMetadataUrl = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
    const resp = await fetch(districtApiMetadataUrl)

    const districtsData = await resp.json()

    setDistrictList(districtsData.districts)

    setDistrictName(districtsData.districts[0].district_id)
  }

  // Function when state is changed
  const changeState = (evnt) => {
    const stateId = evnt.target.value
    if (stateId) {

      setStateName(stateId)

      getDistrictByStates(stateId)
    }
  }

  // Function when District is changed
  const changeDistrict = (evnt) => {
    const districtId = evnt.target.value
    if (districtId) {
      setDistrictName(districtId)
    }
  }

  // get Slots by Districst
  const getSlotsByDistrict = async (distId, dt) => {
    const appointmentSlotApiUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=${dt}`

    const resp = await fetch(appointmentSlotApiUrl)

    const slotsDetail = await resp.json()

    setAppointmentSlotList(slotsDetail.sessions)
  }

  // Set Appointment date
  const changeDate = (dt) => {
    setAppointmentDate(dt)
  }

  const changeAgeFilter = (age) => {
    const ageFl = parseInt(age)

    // Set Age Filter
    if (ageFilter === ageFl) {
      setAgeFilter(0)
    } else {
      setAgeFilter(ageFl)
    }
  }

  const changeVaccineFilter = (vaccine) => {
    if (vaccineFilter === vaccine) {
      setVaccineFilter('')
    } else {
      setVaccineFilter(vaccine)
    }
  }

  const resetAllFilters = (evnt) => {
    // reset Default submit behavious
    evnt.preventDefault()

    setAgeFilter(0)
    setVaccineFilter('')

    // Refresh Slots
    findSlots(evnt)
  }

  // Find all Slots
  const findSlots = (evnt) => {
    evnt.preventDefault()

    const dd = appointmentDate.getDate() < 10 ? '0' + appointmentDate.getDate() : appointmentDate.getDate()
    const mm = appointmentDate.getMonth() + 1 < 10 ? '0' + (appointmentDate.getMonth() + 1) : appointmentDate.getMonth() + 1
    const yyyy = appointmentDate.getFullYear()

    const apptDate = `${dd}-${mm}-${yyyy}`

    //console.log(`District Id: ${districtName} for Date: ${apptDate} `)
    getSlotsByDistrict(districtName, apptDate)
  }

  return (
    <div className='container-fluid container-box'>
      <Header />
      <SearchSlot
        stateName={stateName}
        statesList={statesList}
        districtName={districtName}
        districtList={districtList}
        findSlots={findSlots}
        changeState={changeState}
        changeDistrict={changeDistrict}
        appointmentDate={appointmentDate}
        changeDate={changeDate} />
      <ListSlots
        slotList={appointmentSlotList}
        ageFilter={ageFilter}
        changeAgeFilter={changeAgeFilter}
        vaccineFilter={vaccineFilter}
        changeVaccineFilter={changeVaccineFilter}
        resetAllFilters={resetAllFilters} />
    </div>
  );
}

export default App;
