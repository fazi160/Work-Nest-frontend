import React from 'react'

import { useLocation } from 'react-router-dom';

import SpaceDetailedView from '../../components/User/pages/checkout/SpaceDetailedView';
import UserNavbar from '../../components/User/pages/homepage/UserNavbar';
function UserDetailedViewPage() {
    const location = useLocation();
    const SpaceType = location.state ? location.state.type : null;
    const SpaceId = location.state ? location.state.space : null;


    
  return (
    <div>
      <UserNavbar/>
      <SpaceDetailedView props={[SpaceId,SpaceType]}/>
    </div>
  )
}

export default UserDetailedViewPage
