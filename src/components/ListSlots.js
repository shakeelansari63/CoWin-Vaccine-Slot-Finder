// Icon
import { FaSync } from 'react-icons/fa'

const ListSlots = ({ slotList, ageFilter, changeAgeFilter, vaccineFilter, changeVaccineFilter, resetAllFilters }) => {
    return (
        <div className='container'>
            <div className='rowdisplay'>
                    <input type='radio' className='btn-check' name='age-filter' checked={ageFilter === 18}
                        id='age-filter-18' value='18' onChange={changeAgeFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' htmlFor='age-filter-18'>18+</label>
                    <input type='radio' className='btn-check' name='age-filter' checked={ageFilter === 45}
                        id='age-filter-45' value='45' onChange={changeAgeFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' htmlFor='age-filter-45'>45+</label>
                    <input type='radio' className='btn-check' name='age-filter' checked={ageFilter === 60}
                        id='age-filter-60' value='60' onChange={changeAgeFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' htmlFor='age-filter-60'>60+</label>
                    <input type='radio' className='btn-check' name='vac-filter' 
                        checked={vaccineFilter === 'COVISHIELD'} id='vac-filter-covishield' value='COVISHIELD' 
                        onChange={changeVaccineFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' 
                        htmlFor='vac-filter-covishield'>Covishield</label>
                    <input type='radio' className='btn-check' name='vac-filter' 
                        checked={vaccineFilter === 'COVAXIN'}
                        id='vac-filter-covaxin' value='COVAXIN' 
                        onChange={changeVaccineFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' 
                        htmlFor='vac-filter-covaxin'>Covaxin</label>
                    <input type='radio' className='btn-check' name='vac-filter' 
                        checked={vaccineFilter === 'SPUTNIK'}
                        id='vac-filter-sputnik' value='SPUTNIK' 
                        onChange={changeVaccineFilter} autoComplete="off"/>
                    <label className='filter-btn btn btn-outline-success' 
                        htmlFor='vac-filter-sputnik'>Sputnik</label>
                    <FaSync className='filter-btn' style={{color: 'red', cursor: 'pointer'}} onClick={resetAllFilters} />
            </div>
            {
                slotList.length > 0 ? slotList
                            .filter((slot) => slot.available_capacity > 0)
                            .filter((slot) => ageFilter !== 0 ? slot.min_age_limit === ageFilter : true)
                            .filter((slot) => vaccineFilter !== '' ? slot.vaccine === vaccineFilter : true)
                            .map((slot) => (
                    <div key={`${slot.session_id}`} className='container slot'>
                        <h5>{slot.name}</h5>
                        <p>Address: {slot.address}, {slot.block_name} - {slot.pincode}</p>
                        <div>
                            <span className='vacname'> {slot.vaccine} </span>
                            <span className='vacavl'> ({slot.available_capacity}) </span><br />
                        </div>
                        <div className='rowdisplay'>
                            <div className='vacage'> Age Limit: {slot.min_age_limit}+ </div>
                            <div className='vacfee'> {slot.fee_type === 'Free' ? slot.fee_type : slot.fee_type + ' - ₹' + slot.fee}</div>
                        </div>
                    </div>
                )) : <h5 className='slot'> No Slots Available </h5>
            }
        </div>
    )
}

export default ListSlots
