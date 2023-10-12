import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import '../../styles/madusha/sidebar.css';

export default function Sidebar(){
  return (
    <div className='sidebar-main' style={{  position: 'fixed', display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
      <CDBSidebar className='sidebar-initial' textColor="#000000" backgroundColor="#310365">
        <CDBSidebarHeader className='sidebar-header' prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none">
            SHPMOFY
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='sidebar-item'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/placeorders" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='sidebar-item'>Place Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/employees" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='sidebar-item'>Manage Employees</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='sidebar-item'>Profile</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className='sidebar-footer'>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            All rights reserved
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};