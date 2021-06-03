// react Date Picker
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const SearchSlot = ({
    stateName,
    statesList,
    districtName,
    districtList,
    findSlots,
    changeState,
    changeDistrict,
    appointmentDate,
    changeDate }) => {

    return (
        <form onSubmit={findSlots}>
            <div className='container'>
                <label className='form-label'>Select States</label>
                <select className='form-select form-filed' value={stateName} onChange={changeState}>

                    {
                        statesList.map((state) => (
                            <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                        ))
                    }

                </select>
            </div>
            <div className='container'>
                <label className='form-label'>Select District</label>
                <select className='form-select form-filed' value={districtName} onChange={changeDistrict}>
                    {
                        districtList.map((dist) => (
                            <option key={dist.district_id} value={dist.district_id}>{dist.district_name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='container'>
                <label className='form-label'>Select Date</label>
                <DatePicker dateFormat="dd/MM/yyyy" className='form-control form-filed' selected={appointmentDate} onChange={(dt) => changeDate(dt)} />
            </div>
            <div className='container'>
                <input type='submit' className='btn form-control btn-primary form-filed' value='Find Slots' />
            </div>
        </form>
    )
}

export default SearchSlot
