import React from "react";
import classNames from "classnames";
import "components/Button.scss";

/**
 * @param {object} props is an object with the 4 following parameters:
 * -confirm: bool for css styling
 * -danger: bool for css stylng
 * -disabled: bool for disabling button
 * -children: text to be rendered in the button
 * -onClick: function to be called when button is clicked
 * 
 * @returns a component for a single day in the days selection side bar menu
 */
export default function Button(props) {

   const buttonClass = classNames('button',
      { 'button--confirm': props.confirm },
      { 'button--danger': props.danger })


   return (
      <button className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled} >

         {props.children}
         
      </button>);
}
