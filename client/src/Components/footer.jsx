import React from 'react'
import "./footer.css"
import { Link } from "react-router-dom";
// import ""
const footer = () => {
  return (
    <div>
        <div className="ft-cont">
            <div className="ft-cont2">
            <ul>
                <Link className='Link' to={""}>Faq</Link>
                <Link className='Link' to={"https://www.instagram.com/kriz.098?igsh=MTFuN2RzdTJvcTRnMg=="} target='_blank'>Follow us on instagram<img src="../public/insta.png" alt="" /></Link>
                <Link className='Link' to={"https://www.facebook.com/mushraf.jm"} target='_blank'>Facebook<img src="../public/facebook.png" alt="" /></Link>
                <Link className='Link'>email<img src="../public/email.png" alt="" /></Link>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default footer