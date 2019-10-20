import React from "react";
import "./style.css";

function Alert(props) {
        
    if(props.display){
        return (

                <div className={props.type === 'save' ? "document-alert save" : "document-alert"} style={{display: props.display}}>
                    <div className="alert-header">
                        <h3 className="alert-title">{props.title}</h3>
                        <div className="alert-btn-close" onClick={props.onClose}>X</div>
                    </div>
                    <div className="alert-body">
                        <p className="alert-description">
                            {props.messege}
                        </p>
                    </div>
                </div>

        )
    }else{
        return <div />
    }
    
}

export default Alert;