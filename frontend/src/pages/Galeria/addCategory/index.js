import React from 'react';
import './style.css';

export default function AddCategory(props){
    if(props.display === true){
        
    return(
        <div className="galery-addCategory">
            <div className="addCategory-content">
                <div className="addCategory-header">
                    <h1>Adicinar nova categoria</h1>
                    <button className="addCategory-close" onClick={props.onClose}>X</button>
                </div>
                <div className="addCategory-body">
                    <span>Adicione somente as categorias que você ira usar</span>
                    <div className="from-group">
                        <input type="text" placeholder="Categoria" className="addCategory-input"/>
                        <button className="btn-salvar">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }else{
        return <div />
    }
};