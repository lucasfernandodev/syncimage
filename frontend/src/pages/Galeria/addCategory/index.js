import React, {useState} from 'react';
import Alert from '../../../componentes/Alert';
import axios from 'axios';
import './style.css';

const user_id = localStorage.getItem('user_id');

export default function AddCategory(props){

    const [newCategory, setNewCategory] = useState('');

    // Displayer
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertMessege, setAlertMessege] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertType, setAlertType] = useState('primary');

    async function handleCategory(e){
        e.preventDefault();

        if(!newCategory || typeof(newCategory) === 'undefined' || newCategory === null || newCategory === ''){
            setAlertTitle('Falha ao criar nova categoria');
            setAlertMessege( 'Não deixe campos em branco!');
            setAlertType('fail')
            setAlertDisplay(true);

        }else{

            try {

                const response = await axios.get(`http://localhost:3001/api/category/${user_id}`);

                // Verifica o array inteiro
                if(response.data.category === null){

                    if(!await axios.post(`http://localhost:3001/api/category`, {user_id, category :[newCategory]})){
                        
                        setAlertTitle('Falha ao criar nova categoria');
                        setAlertMessege( 'Tente novamente!');
                        setAlertType('fail')
                        setAlertDisplay(true);
                    }else{
                        setAlertTitle('Sucesso ao criar categoria');
                        setAlertMessege( 'A categoria foi adicionada a sua lista!');
                        setAlertType('sucess')
                        setAlertDisplay(true);
                    }
                }else{
                    const categoryData = response.data.category;


                    // Verifica se existe uma categoria igual no db
                    const filterArray = categoryData.filter(function(categoryData) {
                        return categoryData === newCategory
                    })
                
                    // Lembras de converter tudo pra minusculo
                    if(!filterArray || filterArray.length === 0){

                        categoryData.push(newCategory);

                        if(!await axios.put(`http://localhost:3001/api/category/${user_id}`, {user_id, category : categoryData})){
                            setAlertTitle('Falha ao criar nova categoria');
                            setAlertMessege( 'Tente novamente!');
                            setAlertType('fail')
                            setAlertDisplay(true);
                        }else{
                            setAlertTitle('Sucesso ao criar categoria');
                            setAlertMessege( 'A categoria foi adicionada a sua lista!');
                            setAlertType('sucess')
                            setAlertDisplay(true);
                        }
                    }else{
                        setAlertTitle('Falha ao criar nova categoria');
                        setAlertMessege( 'Categoria digitada já existe!');
                        setAlertDisplay(true);
                        setAlertType('fail')
                        console.log("Erro categoria já existe");
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
                <Alert type={alertType} display={alertDisplay} title={alertTitle} messege={alertMessege} onClose={event => setAlertDisplay(false)}/>
            </div>
        )
    }else{
        return <div />
    }
};