import React from "react";
import "./style.css";

function Alert(props) {
        
    if(props.display){
        return (
            <>
                <div className="document-alert" style={{display: props.display}}>
                    <div className="alert-header">
                        <h3 className="alert-title">{props.title}</h3>
                        <div className="alert-btn-close" onClick={props.onClose}>X</div>
                    </div>
                    <alert className="alert-body">
                        <p className="alert-description">
                            {props.messege}
                        </p>
                    </alert>
                </div>
            </>
        )
    }else{
        return <div />
    }
    
}

export default Alert;