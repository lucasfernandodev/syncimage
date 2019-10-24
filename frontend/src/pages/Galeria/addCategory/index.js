import React, {useState} from 'react';
import Alert from '../../../componentes/Alert';
import axios from 'axios';
import './style.css';

const user_id = localStorage.getItem('user_id');

export default function AddCategory(props){

    const [newCategory, setNewCategory] = useState('');


    // Alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertcontent, setAlertContent] = useState([])

    async function handleCategory(e){
        e.preventDefault();

        const category = newCategory.toLowerCase();

        if(!category || typeof(category) === 'undefined' || category === null || category === ''){
            setAlertContent({
                title: "Falha ao criar nova categoria",
                message: "Não deixe campos em branco!",
                type: "fail"
            })
            setAlertDisplay(true);

        }else{

            try {

                const response = await axios.get(`http://localhost:3001/api/category/${user_id}`);

                // Verifica o array inteiro
                if(response.data.category === null){

                    if(!await axios.post(`http://localhost:3001/api/category`, {user_id, category :[category]})){
                        
                        setAlertContent({
                            title: "Falha ao criar nova categoria",
                            message: "Tente novamente!",
                            type: "fail"
                        })
                        setAlertDisplay(true);
                    }else{
                        setAlertContent({
                            title: "Sucesso ao criar categoria",
                            message: "A categoria foi adicionada a sua lista!",
                            type: "sucess"
                        })
                        setAlertDisplay(true);
                    }
                }else{
                    const categoryData = response.data.category;


                    // Verifica se existe uma categoria igual no db
                    const filterArray = categoryData.filter(function(categoryData) {
                        return categoryData === category
                    })
                
                    // Lembras de converter tudo pra minusculo
                    if(!filterArray || filterArray.length === 0){

                        categoryData.push(category);

                        if(!await axios.put(`http://localhost:3001/api/category/${user_id}`, {user_id, category : categoryData})){

                            setAlertContent({
                                title: "Falha ao criar nova categoria",
                                message: "Tente novamente!",
                                type: "fail"
                            })
                            setAlertDisplay(true);
                        }else{

                            setAlertContent({
                                title: "Sucesso ao criar categoria",
                                message: "A categoria foi adicionada a sua lista!",
                                type: "sucess"
                            })
                            setAlertDisplay(true);
                        }
                    }else{
                        setAlertContent({
                            title: "Falha ao criar nova categoria",
                            message: "Categoria digitada já existe!",
                            type: "fail"
                        })
                        setAlertDisplay(true);
                    }
                }

            } catch (error) {
                // Tratar
                console.log({error})
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
                <Alert  content={alertcontent} display={alertDisplay} onClose={event => setAlertDisplay(false)}/>
            </div>
        )
    }else{
        return <div />
    }
};