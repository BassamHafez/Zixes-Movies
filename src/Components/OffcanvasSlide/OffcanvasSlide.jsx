import React,{ useContext } from "react";
import NavContext from "../../NavContext";
import { useNavigate } from 'react-router-dom';

export default function OffcanvasSlide() {

    let {userInformation,logOut} = useContext(NavContext)
    let Navigate=useNavigate();

    function navigateToHome(){
      Navigate('/Home');
      logOut();
    }
    
  return (
    <>
              <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptions">
                <div className="offcanvas-header">
                  <h5  className="offcanvas-title" id="offcanvasWithBothOptions"><i title="change pic" className="profile-2 fa fa-user mx-2"></i> {userInformation.first_name} {userInformation.last_name}</h5>
                </div>
                <div className="offcanvas-body">

                  <table className="my-4">
                    <tbody >
                    <tr className="mb-2 ">
                      <td className="mx-5"><i className="fa-solid fa-gear"></i></td>
                      <td><h5 className="overview"> Setting & Privacy</h5></td>
                      <td className="ps-5"><i className="fa-solid fa-angle-right"></i></td>
                    </tr>
                    <tr>
                      <td><i className="fa-solid fa-question"></i></td>
                      <td><h5 className="overview"> Help & Support</h5></td>
                      <td className="ps-5"><i className="fa-solid fa-angle-right"></i></td>
                    </tr>
                    <tr>
                      <td><i className="fa-solid fa-exclamation"></i></td>
                      <td><h5 className="overview"> Give Feedback</h5></td>
                      <td className="ps-5"><i className="fa-solid fa-angle-right"></i></td>
                    </tr>
                    <tr onClick={navigateToHome}>
                      <td><i className="fa-solid fa-door-open"></i></td>
                      <td><h5 className="overview"> Log Out</h5></td>
                    </tr>
                    </tbody>
                  </table>
                  <p className="overview">All rights reserved to Bassam Hafez © 2023</p>
                </div>
            </div> 

    </>
  )
}
