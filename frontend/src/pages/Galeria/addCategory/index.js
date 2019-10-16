import React, {useState} from 'react';
import Alert from '../../../componentes/Alert';
import axios from 'axios';
import './style.css';

const user_id = localStorage.getItem('user_id');

export default function AddCategory(props){

    const [newCategory, setNewCategory] = useState('');
    const [isCategory, setIsCategory] = useState(false);

    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertMessege, setAlertMessege] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    async function handleCategory(e){
        e.preventDefault();

        if(!newCategory || typeof(newCategory) === 'undefined' || newCategory === null || newCategory === ''){
            setAlertTitle('Falha ao criar nova categoria');
            setAlertMessege( 'Não deixe campos em branco.');
            setAlertDisplay(true);

        }else{
            const response = await axios.get(`http://localhost:3001/api/category/${user_id}`);
            const result = response.data;

            if(result === null){
              
            const reqData = await axios.post(`http://localhost:3001/api/category`, {user_id, category :[newCategory]});

            }else{

                const categoryData = result.category;
                
                const filterAgeEx1 = categoryData.filter(function(categoryData) {
                    return categoryData == newCategory
                  })
                
                console.log(filterAgeEx1)
                if(!filterAgeEx1 || filterAgeEx1.length === 0){
                    console.log('execultou')
                    categoryData.push(newCategory);
                    const reqData = await axios.put(`http://localhost:3001/api/category/${user_id}`, {user_id, category : categoryData});
                }else{
                    setAlertTitle('Falha ao criar nova categoria');
                    setAlertMessege( 'Categoria digitada já existe.');
                    setAlertDisplay(true); 
                }
            }
        }

    
    }

    // Render
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
                            <input type="text" placeholder="Categoria" onChange={event => setNewCategory(event.target.value)} className="addCategory-input"/>
                            <button className="btn-salvar" onClick={handleCategory}>+</button>
                        </div>
                    </div>
                </div>
                <Alert display={alertDisplay} title={alertTitle} messege={alertMessege} onClose={event => setAlertDisplay(false)}/>
            </div>
        )
    }else{
        return <div />
    }
};