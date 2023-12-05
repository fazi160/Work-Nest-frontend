import React from 'react'
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/admin&Customer/Navbar';
import SpaceDetailedView from '../../components/User/pages/checkout/SpaceDetailedView';
function UserDetailedViewPage() {
    const location = useLocation();
    const SpaceType = location.state ? location.state.type : null;
    const SpaceId = location.state ? location.state.space : null;
    console.log(SpaceType, SpaceId, "fsdafsdafds");

    
  return (
    <div>
      <Navbar/>
      <SpaceDetailedView props={[SpaceId,SpaceType]}/>
    </div>
  )
}

export default UserDetailedViewPage
