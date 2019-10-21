import React from "react";
import "./style.css";

function Alert(props) {

    let type = props.type;

    if(!type){
        type = 'primary';
    }
        
    if(props.display){
        return (

                <div 
                className={
                    type === 'fail' ? 'document-alert fail' : 'document-alert' |
                    type === 'sucess' ? 'document-alert sucess' : 'document-alert' |
                    type === 'primary' ? 'document-alert primary' : 'document-alert' |
                    type === 'warning' ? 'document-alert warning' : 'document-alert'
                }
                style={{display: props.display}}
                >

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