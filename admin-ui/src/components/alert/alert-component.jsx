
import React, { Component } from "react";
const AlertComponent = ({ message, colour }) => {
    return (
      <div>
        {message ? (
          <div className={`alert alert-${colour} error-alert`} role="alert">
            <b>{message}</b>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };
  
  export default AlertComponent;
  