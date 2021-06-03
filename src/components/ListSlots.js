const ListSlots = ({ slotList }) => {
    return (
        <div className='container'>
            {
                slotList.length > 0 ? slotList.filter((slot) => slot.available_capacity > 0).map((slot) => (
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
